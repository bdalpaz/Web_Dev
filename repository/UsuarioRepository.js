const db = require('../database');

function insert(nome, email, senhaHash, callback) {
  db.run(
    'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senhaHash],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, nome, email });
    }
  );
}

module.exports = { insert };