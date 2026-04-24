const usuarioService = require('../service/UsuarioService');

function create(req, res) {
  const { nome, email, senha } = req.body;
  usuarioService.create(nome, email, senha, (err, usuario) => {
    if (err) return res.status(400).json({ erro: err.message });
    res.status(201).json(usuario);
  });
}

function login(req, res) {
  const { email, senha } = req.body;
  usuarioService.login(email, senha, (err, usuario) => {
    if (err) return res.status(401).json({ erro: err.message });
    req.session.usuario = usuario;
    res.json({ mensagem: 'Login realizado com sucesso', usuario });
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao encerrar sessão' });
    res.json({ mensagem: 'Logout realizado com sucesso' });
  });
}

module.exports = { create, login, logout };