const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')
const tokenMiddleware = require('../middleware/token.js')

router.get('/users', user.getUsers)
router.get('/users/:id', tokenMiddleware.verifyToken, tokenMiddleware.verifyUserOrAdminRights, user.getUserById)
// Récupérer le token d'un utilisateur
router.get('/getjwtDeleg/:id', user.getToken)

router.post('/users', user.newUser)
router.post('/login', user.login)

router.delete('/users', tokenMiddleware.verifyToken, tokenMiddleware.verifyUserAdmin, user.deleteUsers)
router.delete('/users/:id', tokenMiddleware.verifyToken, tokenMiddleware.verifyUserOrAdminRights, user.deleteUser)

module.exports = router
