const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')
const middleware = require('./middleware.js')

router.get('/users', user.getUsers)
router.post('/users', user.newUser)
router.delete('/users', user.deleteUsers)
router.delete('/users/:id', user.deleteUser)

// Récupérer le token d'un utilisateur
router.get('/getjwtDeleg/:username', user.getToken)

// Récupérer le token de l'utilisateur
router.get('/users/data', middleware.verifyToken, user.getData)

router.post('/login', user.login)

// router.get('api/users/data', user.getUserData)

// router.put('/api/users', user.updateUser)

// router.get('/api/users/:email', user.getUserByEmail)
// router.post('/login', user.login)

module.exports = router
