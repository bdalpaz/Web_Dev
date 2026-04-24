const bcrypt = require('bcrypt');
const usuarioRepository = require('../repository/UsuarioRepository');

async function create(nome, email, senha, callback) {
  if (!nome || !email || !senha) {
    return callback(new Error('Nome, email e senha são obrigatórios'));
  }
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    usuarioRepository.insert(nome, email, senhaHash, callback);
  } catch (err) {
    callback(err);
  }
}

function login(email, senha, callback) {
  if (!email || !senha) {
    return callback(new Error('Email e senha são obrigatórios'));
  }
  usuarioRepository.findByEmail(email, async (err, usuario) => {
    if (err) return callback(err);
    if (!usuario) return callback(new Error('Usuário não encontrado'));
    try {
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) return callback(new Error('Senha inválida'));
      callback(null, { id: usuario.id, nome: usuario.nome, email: usuario.email });
    } catch (err) {
      callback(err);
    }
  });
}

module.exports = { create, login };