const express = require('express');
const session = require('express-session');
const db = require('./database');
const mensagemRoutes = require('./routes/mensagemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const aula07Routes = require('./routes/aula07Routes');

const app = express();
app.use(express.json());

// Configuração do express-session
app.use(session({
  secret: 'chave-secreta-tpe',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30 // 30 minutos
  }
}));

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
app.use(aula07Routes);

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));