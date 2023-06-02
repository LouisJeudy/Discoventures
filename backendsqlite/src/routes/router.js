const router = require('express').Router()
router.use(require('./user'))
router.use(require('./route'))
router.use(require('./routeUserVote'))
module.exports = router
