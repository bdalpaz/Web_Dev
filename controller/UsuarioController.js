const usuarioService = require('../service/UsuarioService');

function create(req, res) {
  const { nome, email, senha } = req.body;
  usuarioService.create(nome, email, senha, (err, usuario) => {
    if (err) return res.status(400).json({ erro: err.message });
    res.status(201).json(usuario);
  });
}

module.exports = { create };