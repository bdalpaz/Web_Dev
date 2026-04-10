const express = require('express');
const router = express.Router();
const controller = require('../controller/MensagemController');

router.get('/mensagem', controller.listAll);
router.post('/mensagem', controller.create);

module.exports = router;    