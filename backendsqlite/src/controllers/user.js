const status = require('http-status')
const userModel = require('../models/users.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const bcrypt = require('bcrypt')
const jws = require('jws')
const { TOKENSECRET } = process.env

const SALT_ROUNDS = 2
const ATTRIBUTES_IN_TOKEN = ['id', 'isadmin']

function validPassword (password) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
}

module.exports = {
  async getUsers (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get all users'
    // #swagger.parameters['x-access-token'] = { in: 'header', description: 'JWT token', required: 'true', type: 'string' }
    // #swagger.responses[200] = { description: 'Returning users', type: 'array', schema: { $data: [{$id: '1', $username: 'Louis', $email: 'louisjeudy@gmail.com', $isadmin: true}, {$id: '2', $username: 'Harry', $email: 'harry@email.com', $isadmin: false}] } }
    const data = await userModel.findAll({ attributes: ['id', 'username', 'email', 'isadmin'] })
    res.json({ status: status.OK, message: 'Utilisateurs disponibles', data })
  },
  async getUserById (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get user by id'
    // #swagger.parameters['x-access-token'] = { in: 'header', description: 'JWT token', required: 'true', type: 'string' }
    // #swagger.parameters['id'] = { in: 'path', type: 'integer', description: 'id of the user', required: true }
    // #swagger.responses[400] = { description: "You must specify the id" }
    if (!has(req.params, 'id')) throw new CodeError('ID manquant', status.BAD_REQUEST)
    const { id } = req.params
    const attributesFetched = req.user.isadmin ? ['id', 'username', 'email', 'isadmin'] : ['id', 'username', 'email'] // TODO: add spotifyToken when it's functional

    const data = await userModel.findOne({ where: { id }, attributes: attributesFetched })
    // #swagger.responses[404] = { description: "User not found" }
    if (!data) throw new CodeError('L\'utilisateur n\'existe pas', status.NOT_FOUND)
    // #swagger.responses[200] = { description: "User returned", schema: { $id: "4", $username: 'Power', $email: 'power@email.com', $isadmin: false } }
    res.json({ status: status.OK, message: 'Données de l\'utilisateur', data })
  },
  async newUser (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create a new user'
    // #swagger.parameters['data'] = { in: 'body', schema: {$username: 'Power', $email: 'power@email.com', $password: 'x!P0W3r!x' }, required: 'true', }
    if (!req.body.data) {
    // #swagger.reponses[400] = { description: 'User not added' }
      throw new CodeError('Body manquant', status.BAD_REQUEST)
    }
    // #swagger.reponses[403] = { description: 'Username missing' }
    const dataJSON = JSON.parse(req.body.data)
    if (!has(dataJSON, 'username') || dataJSON.username.length === 0) {
      throw new CodeError('Vous devez spécifier un nom d\'utilisateur', status.FORBIDDEN)
    }
    // #swagger.reponses[403] = { description: 'Username too long' }
    if (has(dataJSON, 'username') && dataJSON.username.length > 16) {
      throw new CodeError('Nom d\'utilisateur doit être inférieur à 16 caractères', status.FORBIDDEN)
    }
    // #swagger.reponses[403] = { description: 'Email missing' }
    if (!has(dataJSON, 'email') || dataJSON.email.length === 0) {
      throw new CodeError('Vous devez spécifier une adresse e-mail', status.FORBIDDEN)
    }
    const userWithSameUsername = await userModel.findOne({
      where: { username: dataJSON.username },
      attributes: ['id', 'username']
    })
    // #swagger.reponses[403] = { description: 'Username already taken' }
    if (userWithSameUsername) throw new CodeError('Nom d\'utilisateur déjà utilisé', status.FORBIDDEN)
    const userWithSameEmail = await userModel.findOne({
      where: { email: dataJSON.email },
      attributes: ['id', 'email']
    })
    // Si l'email est déjà utilisé
    // #swagger.reponses[403] = { description: 'Email already taken' }
    if (userWithSameEmail) throw new CodeError('E-mail déjà utilisé !', status.FORBIDDEN)
    // Si le mot de passe ne respecte pas les normes
    if (!validPassword(dataJSON.password)) throw new CodeError('Mot de passe trop faible', status.FORBIDDEN)
    const passwordHashed = await bcrypt.hash(dataJSON.password, SALT_ROUNDS)
    const newUser = {
      username: dataJSON.username,
      email: dataJSON.email,
      password: passwordHashed,
      isAdmin: false,
      spotifyToken: null
    }
    await userModel.create(newUser)

    // #swagger.reponses[201] = { description: 'User successfully added.' }
    return res
      .status(201)
      .send({ status: status.CREATED, message: 'Utilisateur créé' })
  },
  async deleteUsers (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete all users'
    // #swagger.parameters['x-access-token'] = { in: 'header', description: 'JWT token', required: 'true', type: 'string' }
    // On supprime toutes les entrées de la table
    await userModel.destroy({ truncate: true })
    // #swagger.responses[200] = { description: "Users deleted" }
    res.json({ status: status.OK, message: 'Utilisateurs supprimés' })
  },
  async deleteUser (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete an user by id'
    // #swagger.parameters['x-access-token'] = { in: 'header', description: 'JWT token', required: 'true', type: 'string' }
    // #swagger.parameters['id'] = { in: 'path', type: 'integer', description: 'id of the user', required: 'true' }
    // #swagger.responses[400] = { description: "You must specify the id" }
    if (!has(req.params, 'id')) throw new CodeError('ID manquant', status.BAD_REQUEST)
    const idUser = req.params.id
    const usernameExists = await userModel.findOne({ where: { id: idUser } })

    // On ne peut pas supprimer un utilisateur inexistant
    if (!usernameExists) {
      // #swagger.responses[404] = { description: "User not found" }
      throw new CodeError('L\'utilisateur n\'existe pas', status.NOT_FOUND)
    }

    await userModel.destroy({ where: { id: idUser } })
    // #swagger.responses[200] = { description: "User deleted" }
    res.json({ status: status.OK, message: 'Utilisateur supprimé' })
  },

  async getToken (req, res) {
    // #swagger.tags = ['Token']
    // #swagger.summary = 'Retrieve token for the user'
    // #swagger.parameters['id'] = {in: 'path', type: 'integer', description: 'id', required: true}
    // Vérification de l'existence de l'utilisateur dans la base
    // #swagger.responses[400] = { description: "You must specify the id" }
    if (!has(req.params, 'id')) throw new CodeError('ID manquant', status.BAD_REQUEST)
    const user = await userModel.findOne({
      attributes: ATTRIBUTES_IN_TOKEN,
      where: { id: req.params.id }
    })
    // #swagger.responses[404] = { description: "User not found" }
    if (!user) {
      throw new CodeError('L\'utilisateur n\'existe pas', status.NOT_FOUND)
    }

    // Génération du token avec l'id et isadmin en valeur du payload
    const token = jws.sign({
      header: { alg: 'HS256' },
      payload: user,
      secret: TOKENSECRET
    })
    // #swagger.responses[200] = { description: 'Returning token', schema: { "token": "eyJhbGciOiJIUzI1NiJ9.bWFyaw.DAFVHDlid5Factj50DywBd3DhmBZfHDgcLkJiURjZmE" } }
    res.json({ status: status.OK, message: 'Jeton retourné', token })
  },

  async login (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Verify credentials of user using email and password and return token'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $email: 'johndoe@email.com', $password: '12345'}}
    if (!has(req.body, ['email', 'password'])) throw new CodeError('You must specify the email and password', status.BAD_REQUEST)
    const email = req.body.email
    const password = req.body.password
    const userPassword = await userModel.findOne({ attributes: ['password'], where: { email } })
    // #swagger.responses[403] = { description: 'Invalid credentials' }
    if (!userPassword) {
      throw new CodeError('Les identifiants ne sont pas corrects', status.FORBIDDEN)
    }
    if (await bcrypt.compare(password, userPassword.password)) {
      const user = await userModel.findOne({ attributes: ATTRIBUTES_IN_TOKEN, where: { email } })
      const token = jws.sign({ header: { alg: 'HS256' }, payload: user, secret: TOKENSECRET })
      // #swagger.responses[200] = { description: 'Email/Mot de passe ok', schema: { "token": "eyJhbGciOiJIUzI1NiJ9.bWFyaw.DAFVHDlid5Factj50DywBd3DhmBZfHDgcLkJiURjZmE" } }
      res.json({ status: status.OK, message: 'Email/Mot de passe ok', token })
    }
  }
}
