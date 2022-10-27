const ControllerAuth = require('../controller/controllerAuth');
const router = require('express').Router();

router.get('/', ControllerAuth.viewLogin)
router.get('/google', ControllerAuth.loginGoogle)
router.get('/google/callback', ControllerAuth.redirectGoogle)

router.get('/facebook', ControllerAuth.loginFacebook)
router.get('/facebook/callback', ControllerAuth.redirectFacebook)

router.get('/success', (req, res) => res.send('Success!'))

module.exports = router;              