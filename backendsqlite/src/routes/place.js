const express = require('express')
const router = express.Router()
const places = require('../controllers/place.js')
const tokenMiddleware = require('../middleware/token.js')

router.use('/places', tokenMiddleware.verifyToken)

router.get('/places/:latitude/:longitude', places.getPlaceByCoords)

router.post('/places', places.newPlace)

module.exports = router
