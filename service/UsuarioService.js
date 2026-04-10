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

module.exports = { create };