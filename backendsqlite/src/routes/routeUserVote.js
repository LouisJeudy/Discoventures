const express = require('express')
const router = express.Router()
const routeUserVote = require('../controllers/routeUserVote.js')
const tokenMiddleware = require('../middleware/token.js')
const routeMiddleware = require('../middleware/route.js')

// On verifie pour chaque requête passant par ce chemin, qu'il y a bien
// l'entête x-access-token et qu'il est valide
router.use('/routesUsersVote', tokenMiddleware.verifyToken)

router.post('/routesUsersVote/:id', routeMiddleware.verifyRouteExists, routeUserVote.newRouteUserVote)

module.exports = router
