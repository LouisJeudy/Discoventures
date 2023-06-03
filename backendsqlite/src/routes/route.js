const express = require('express')
const router = express.Router()
const route = require('../controllers/route.js')
const tokenMiddleware = require('../middleware/token.js')

// On verifie pour chaque requête passant par ce chemin, qu'il y a bien
// l'entête x-access-token et qu'il est valide
router.use('/routes', tokenMiddleware.verifyToken)

// ADMIN ROUTES
router.delete(
  '/routes/:id',
  tokenMiddleware.verifyUserOrAdminRights,
  route.deleteRoute
)

// USER ROUTES
router.get('/routes', route.getRoutes)
// Récupérer la liste de tous les parcours d'un utilisateur
router.get(
  '/routes/users/:id',
  tokenMiddleware.verifyUserOrAdminRights,
  route.getRoutesByUserId
)
router.get('/routes/:id', route.getRoute)
router.post('/routes', route.newRoute)

module.exports = router
