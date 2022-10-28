const ControllerAuth = require('../controller/controllerAuth');
const router = require('express').Router();
const passport = require('passport');

router.get('/', ControllerAuth.viewLogin)
router.post('/', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/oauth'
}))
router.get('/google', ControllerAuth.loginGoogle)
router.get('/facebook', ControllerAuth.loginFacebook)
router.get('/google/callback', ControllerAuth.redirectGoogle)
router.get('/facebook/callback', ControllerAuth.redirectFacebook)
router.get('/success', (req, res) => res.send('Success!'))

module.exports = router;              