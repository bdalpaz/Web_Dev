const db = require('../database');

function listAll(callback) {
  db.all('SELECT * FROM mensagem', [], callback);
}

function insert(texto, callback) {
  db.run('INSERT INTO mensagem (texto) VALUES (?)', [texto], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, texto });
  });
}

module.exports = { listAll, insert };   