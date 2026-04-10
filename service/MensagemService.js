const mensagemRepository = require('../repository/MensagemRepository');

function listAll(callback) {
  mensagemRepository.listAll(callback);
}

function insert(texto, callback) {
  if (!texto || texto.trim() === '') {
    return callback(new Error('Texto da mensagem é obrigatório'));
  }
  mensagemRepository.insert(texto, callback);
}

module.exports = { listAll, insert };