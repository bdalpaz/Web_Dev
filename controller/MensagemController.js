const mensagemService = require('../service/MensagemService');

function listAll(req, res) {
  mensagemService.listAll((err, dados) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(dados);
  });
}

function create(req, res) {
  const { texto } = req.body;
  mensagemService.insert(texto, (err, nova) => {
    if (err) return res.status(400).json({ erro: err.message });
    res.status(201).json(nova);
  });
}

module.exports = { listAll, create };