const express = require('express');
const path = require('path');
const router = express.Router();

// http://localhost:3000/aula07
router.get('/aula07', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Aula_07', 'painel_controle.html'));
});

router.get('/aula07/visualizacao', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Aula_07', 'painel_visualizacao.html'));
});

module.exports = router;
