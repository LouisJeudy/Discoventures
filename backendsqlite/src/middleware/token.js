/* eslint-disable no-undef */
const jws = require('jws')
const status = require('http-status')
const { TOKENSECRET } = process.env
const CodeError = require('../util/CodeError.js')

function verifyToken (req, res, next) {
  // Code vérifiant qu'il y a bien un token dans l'entête
  // eslint-disable-next-line no-prototype-builtins
  if (!req.headers || !req.headers.hasOwnProperty('x-access-token')) { throw new CodeError('Token manquant', status.UNAUTHORIZED) }
  // Code vérifiant la validité du token
  if (
    !jws.verify(req.headers['x-access-token'], jws.ALGORITHMS[0], TOKENSECRET)
  ) { throw new CodeError('Token invalide', status.FORBIDDEN) }
  // Le payload du token contient les informations de l'utilisateur (username, email, isAdmin...)
  // On modifie l'objet requête pour mettre les informations de l'utilisateur à disposition pour les middleware suivants
  req.user = JSON.parse(jws.decode(req.headers['x-access-token']).payload)
  // On appelle la fonction middleware suivante :
  next()
}

function verifyUserAdmin (req, res, next) {
  // Code vérifiant que l'utilisateur est un administrateur (présent si une fonction middleware
  // a au préalable ajouté l'user dans req)
  // Provoque une réponse en erreur avec un code de retour 403
  if (!req.user.isadmin) {
    throw new CodeError('Vous n\'avez pas le droit d\'effectuer cette action', status.FORBIDDEN)
  }
  // On appelle la fonction middleware suivante que si la condition est vérifiée
  next()
}

function verifyUser (req, res, next) {
  // Code vérifiant que la personne qui fait l'action est l'utilisateur lui-même
  const { id } = req.params
  const reqId = req.user.id.toString()
  if (reqId !== id) {
  // Provoque une réponse en erreur avec un code de retour 403
    throw new CodeError('Vous n\'avez pas le droit d\'effectuer cette action', status.FORBIDDEN)
  }
  // On appelle la fonction middleware suivante que si la condition est vérifiée
  next()
}

function verifyUserOrAdminRights (req, res, next) {
  // Code vérifiant que la personne qui fait l'action est l'utilisateur lui-même ou l'admin
  const { id } = req.params
  if (req.user.id !== id && !req.user.isadmin) {
  // Provoque une réponse en erreur avec un code de retour 403
    throw new CodeError('Vous n\'avez pas le droit d\'effectuer cette action', status.FORBIDDEN)
  }
  // On appelle la fonction middleware suivante que si la condition est vérifiée
  next()
}

module.exports = {
  verifyToken,
  verifyUserAdmin,
  verifyUser,
  verifyUserOrAdminRights
}
