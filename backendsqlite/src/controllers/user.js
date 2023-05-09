const status = require('http-status')
const userModel = require('../models/users.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const bcrypt = require('bcrypt')
const jws = require('jws')
require('mandatoryenv').load(['TOKENSECRET'])
const { TOKENSECRET } = process.env

const saltRounds = 2

function validPassword (password) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
}

module.exports = {
  // async getUserByEmail (req, res) {
  //   // #swagger.tags = ['Users']
  //   // #swagger.summary = 'Get user by Email'
  //   if (!has(req.params, 'email')) throw new CodeError('You must specify the email', status.BAD_REQUEST)
  //   const { email } = req.params
  //   const data = await userModel.findOne({ where: { email }, attributes: ['id', 'name', 'email'] })
  //   if (!data) throw new CodeError('User not found', status.NOT_FOUND)
  //   res.json({ status: true, message: 'Returning user', data })
  // },
  async getUsers (req, res) {
    /// #swagger.tags = ['Users']
    // #swagger.summary = 'Get all users'
    // #swagger.parameters['user'] = {in: 'header', type: 'string', description: 'username'}
    // #swagger.responses[200] = {description: 'Returning users', schema: {$data: [{$id: '1',$username: 'louis',$email: 'louis@jeudy.com', $isAdmin: true}]}}

    const data = await userModel.findAll({ attributes: ['id', 'username', 'email', 'isAdmin'] })
    res.json({ status: 200, message: 'Utilisateurs disponibles', data })
  },
  async newUser (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create an user'
    // #swagger.parameters['data'] = { in: 'body', description:'username', schema: { $username: 'louis', $email:'mark@com.fr', $password:'markcavendish'}}
    // #swagger.responses[201] = {description: "User Added"}
    const parsedBody = JSON.parse(req.body.data)
    const username = parsedBody.username
    const email = parsedBody.email
    const isAdmin = false
    const spotifyToken = null
    const emailExists = await userModel.findOne({ where: { email: email } })
    const usernameExists = await userModel.findOne({ where: { username: username } })

    // On n'accepte pas la création si le nom d'utilisateur est déjà utilisé
    if (usernameExists) {
      throw new CodeError('Nom d\'utilisateur déjà utilisé !', status.FORBIDDEN)
    }

    // On n'accepte pas la création si le mail est déjà utilisé
    if (emailExists) {
      throw new CodeError('Email déjà utilisé !', status.FORBIDDEN)
    }

    // On n'accepte pas la création si la taille du username est > 16 caractères
    if (username.length > 16) {
      throw new CodeError('Le nom d\'utilisateur doit être supérieur à 16 caractères', status.FORBIDDEN)
    }

    // Si le mot de passe ne respecte pas les normes
    if (!validPassword(parsedBody.password)) throw new CodeError('Mot de passe erroné !', status.FORBIDDEN)
    const password = await bcrypt.hash(parsedBody.password, saltRounds)

    await userModel.create({ username, email, password, isAdmin, spotifyToken })
    res.statusCode = 201
    res.json({ status: res.statusCode, message: 'Utilisateur créé' })
  },
  async deleteUsers (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete all users'

    const token = req.headers['x-access-token']
    const email = jws.decode(token).payload
    const admin = await userModel.findOne({ attributes: ['username', 'email', 'isadmin', 'spotifyToken'], where: { email: email } })

    if (!admin.isadmin) {
      throw new CodeError('Vous n\'êtes pas administrateur pour cette action !', status.FORBIDDEN)
    }

    // On supprime toutes les entrées de la table
    await userModel.destroy({ where: {}, truncate: true })
    // #swagger.responses[200] = {description: "Users deleted"}
    res.json({ status: 200, message: 'Utilisateurs supprimés' })
  },
  async deleteUser (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete an user by id'
    // #swagger.parameters['id'] = {in: 'path', type: 'integer', description: 'id of the user'}
    // #swagger.responses[200] = {description: "User deleted"}
    const token = req.headers['x-access-token']
    const email = jws.decode(token).payload
    const admin = await userModel.findOne({ attributes: ['username', 'email', 'isadmin', 'spotifyToken'], where: { email: email } })

    if (!admin.isadmin) {
      throw new CodeError('Vous n\'êtes pas administrateur pour cette action !', status.FORBIDDEN)
    }

    const idUser = req.params.id
    const usernameExists = (await userModel.findOne({ where: { id: idUser } }))

    // On n'accepte pas la création si le nom d'utilisateur est déjà utilisé
    if (!usernameExists) {
      throw new CodeError('L\'utilisateur n\'existe pas !', status.FORBIDDEN)
    }

    await userModel.destroy({ where: { id: idUser } })
    res.json({ status: 200, message: 'Utilisateur supprimé' })
  },
  async getToken (req, res) {
    // #swagger.tags = ['Token']
    // #swagger.summary = 'Retrieve token for the user'
    // #swagger.parameters['username'] = {in: 'path', type: 'string', description: 'username'}
    // #swagger.responses[200] = {descriptiuon: 'Returning token', schema:{"token": "eyJhbGciOiJIUzI1NiJ9.bWFyaw.DAFVHDlid5Factj50DywBd3DhmBZfHDgcLkJiURjZmE"}}
    // Vérification de l'existence de l'utisateur dans la base
    const userData = req.params
    const user = await userModel.findOne({ where: { username: userData.username } })

    if (user === null) {
      throw new CodeError('L\'utilisateur n\'existe pas !', status.NOT_FOUND)
    }

    // Génération du token avec le username en valeur du payload
    const token = jws.sign({
      header: { alg: 'HS256' },
      payload: user.email,
      secret: TOKENSECRET
    })
    // #swagger.responses[200] = {description: "Returning token"}
    res.json({ status: 200, message: 'Jeton retourné', token })
  },
  async getData (req, res) {
    // #swagger.tags = ['whoami']
    // #swagger.summary = 'Get the username through token'
    // #swagger.parameters['x-access-token'] = {in: 'header', type: 'string', description: 'token generated by /getjwtdeleg/{user} endpoint'}
    // #swagger.responses[200] = {description: "Returning username", schema: {"user": {$username: 'louis', $email: 'louis@com.fr', $isAdmin: '[true|false]', $spotifyToken: '[null|spotifyTokenHash]'}}}
    const token = req.headers['x-access-token']
    const email = jws.decode(token).payload
    const user = await userModel.findOne({ attributes: ['username', 'email', 'isadmin', 'spotifyToken'], where: { email: email } })
    // Vérification si l'utilisateur renseigné par le token est présent dans la base de données
    if (!user) {
      throw new CodeError('L\'utilisateur n\'existe pas !', status.NOT_FOUND)
    }
    const data = user.username
    // Réponse JSON dans le format souhaité
    res.json({ status: 200, message: 'Données de l\'utilisateur', user })
  },
  async login (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Verify credentials of user using email and password and return token'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $email: 'John.Doe@acme.com', $password: '12345'}}
    if (!has(req.body, ['email', 'password'])) throw new CodeError('You must specify the email and password', status.BAD_REQUEST)
    const email = req.body.email
    const password = req.body.password

    const user = await userModel.findOne({ where: { email } })

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jws.sign({ header: { alg: 'HS256' }, payload: email, secret: TOKENSECRET })
        res.json({ status: true, message: 'Email/Mot de passe ok', token })
        return
      }
    }
    res.status(status.FORBIDDEN).json({ status: false, message: 'Les identifiants ne sont pas correctes' })
  }

  // async newUser (req, res) {
  //   // #swagger.tags = ['Users']
  //   // #swagger.summary = 'New User'
  //   // #swagger.parameters['obj'] = { in: 'body', description:'Name and email', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!'}}
  //   if (!has(req.body, ['name', 'email', 'password'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
  //   const { name, email, password } = req.body
  //   console.log(req.body)
  //   if (!validPassword(password)) throw new CodeError('Weak password!', status.BAD_REQUEST)
  //   await userModel.create({ name, email, passhash: await bcrypt.hash(password, 2) })
  //   res.json({ status: true, message: 'User Added' })
  // },
  // async updateUser (req, res) {
  //   // TODO : verify if the user that wants to update this user is an admin or the user himself (using token...)
  //   // #swagger.tags = ['Users']
  //   // #swagger.summary = 'Update User'
  //   // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!'}}
  //   if ((!has(req.body, ['name', 'email', 'password']))) throw new CodeError('You must specify the name, email and password', status.BAD_REQUEST)
  //   const { name, email, password } = req.body
  //   await userModel.update({ name, passhash: await bcrypt.hash(password, 2) }, { where: { email } })
  //   res.json({ status: true, message: 'User updated' })
  // },
  // async deleteUser (req, res) {
  //   // TODO : verify if the user that wants to update user is an admin (using token...)
  //   // #swagger.tags = ['Users']
  //   // #swagger.summary = 'Delete User'
  //   if (!has(req.params, 'id')) throw new CodeError('You must specify the id', status.BAD_REQUEST)
  //   const { id } = req.params
  //   await userModel.destroy({ where: { id } })
  //   res.json({ status: true, message: 'User deleted' })
  // },
}
