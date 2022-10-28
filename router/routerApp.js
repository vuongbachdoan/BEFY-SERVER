const ControllerApp = require('../controller/controllerApp')
const router = require('express').Router()

router.get('/home', ControllerApp.getHome)
router.get('/playlist', ControllerApp.getPlaylist)
router.get('/song', ControllerApp.getSong)
router.get('/search', ControllerApp.search)

module.exports = router