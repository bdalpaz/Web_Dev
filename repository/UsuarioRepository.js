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

function findByEmail(email, callback) {
  db.get(
    'SELECT * FROM usuario WHERE email = ?',
    [email],
    (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    }
  );
}

module.exports = { insert, findByEmail };