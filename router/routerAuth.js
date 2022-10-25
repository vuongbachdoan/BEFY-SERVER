const ControllerAuth = require('../controller/controllerAuth');

const router = require('express').Router();

router.get('/', ControllerAuth.userLogin)

module.exports = router;