const ControllerAuth = require('../controller/controllerAuth');
const router = require('express').Router();

router.get('/', ControllerAuth.viewLogin)
router.get('/google', ControllerAuth.loginGoogle)
router.get('/google/callback', ControllerAuth.redirectGoogle)
router.get('/success', (req, res) => res.render('Success!'))
router.get('/fail', (req, res) => res.render('Fail!'))

module.exports = router;              