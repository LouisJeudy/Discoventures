const status = require('http-status')
const CodeError = require('../util/CodeError.js')
const routeModel = require('../models/routes.js')

async function verifyRouteExists (req, res, next) {
  // Vérifie si la route existe dans la base de données ou non
  const { id } = req.params
  const routeExists = await routeModel.findOne({ where: { id: id } })
  if (!routeExists) {
  // Provoque une réponse en erreur avec un code de retour 404
    throw new CodeError('Route non trouvée', status.NOT_FOUND)
  }
  // On appelle la fonction middleware suivante que si la condition est vérifiée
  next()
}

module.exports = {
  verifyRouteExists
}
