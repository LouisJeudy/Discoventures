const userModel = require('../models/users.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const jws = require('jws')
const { TOKENSECRET } = process.env
const status = require('http-status')

// Fichier permettant de centraliser les fonctions (middleware) de vérification de token, d'utilisateurs...

module.exports = {
  verifyToken (req, res, next) {
    // Vérification de l'existence du token dans le header
    if (!has(req.headers, ['x-access-token'])) {
      throw new CodeError('You must specify the token', status.BAD_REQUEST)
    }
    const token = req.headers['x-access-token']

    // Vérification de la validité du token
    if (!jws.verify(token, 'HS256', TOKENSECRET)) {
      throw new CodeError('Invalid token !', status.BAD_REQUEST)
    }
    next()
  },
  async verifyUser (req, res, next) {
    const token = req.headers['x-access-token']
    const username = jws.decode(token).payload
    console.log(username)

    // Vérification de l'existence de l'utilisateur dans la base de données
    const user = await userModel.findOne({ where: { username: username } })
    if (user === null) {
      throw new CodeError('User not found !', status.NOT_FOUND)
    }
    const userParam = req.params

    // Si l'utilisateur est différent entre l'url et la requête
    if (userParam.user !== username) {
      throw new CodeError('Different user between the url and the token', status.BAD_REQUEST)
    }
    next()
  },
  async notAllowed (req, res) {
    // #swagger.tags = ['Not allowed']
    // #swagger.responses[405] = {description: "Method not allowed"}
    throw new CodeError('Method not allowed', status.METHOD_NOT_ALLOWED)
  }
}
