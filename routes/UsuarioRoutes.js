const express = require('express');
const router = express.Router();
const controller = require('../controller/UsuarioController');

// Middleware de autenticação
function autenticar(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  }
  res.status(401).json({ erro: 'Acesso negado. Faça login primeiro.' });
}

// Rotas públicas
router.post('/usuarios', controller.create);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

// Rota protegida (só acessível com sessão ativa)
router.get('/perfil', autenticar, (req, res) => {
  res.json({
    mensagem: 'Bem-vindo à rota protegida!',
    usuario: req.session.usuario
  });
});

module.exports = router;