const express = require('express');
const db = require('./database');
const mensagemRoutes = require('./routes/mensagemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
app.use(express.json());

// Bootstrap das tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS mensagem (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      texto TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    )
  `);
});

app.use(mensagemRoutes);
app.use(usuarioRoutes);

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));