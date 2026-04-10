const express = require('express');
const router = express.Router();
const controller = require('../controller/UsuarioController');

router.post('/usuarios', controller.create);

module.exports = router;