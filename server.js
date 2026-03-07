const express = require('express');
const cors = require('cors'); 
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(cors()); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let logsMonitoramento = [];

app.use((req, res, next) => {
    const ipOrigem = req.ip || req.connection.remoteAddress;
    
    // lê descodifica a URL
    let urlAcessada = req.originalUrl;
    try {
        urlAcessada = decodeURIComponent(req.originalUrl);
    } catch (e) {}

    // lê também os dados enviados nos formulários (POST/PUT)
    let corpoDaRequisicao = "";
    if (req.body && Object.keys(req.body).length > 0) {
        // transforma o JSON do body em texto para o IDS conseguir ler
        corpoDaRequisicao = JSON.stringify(req.body); 
    }

    // junta a URL e o Body para o "scanner" analisar TUDO
    const dadosParaAnalisar = urlAcessada + " " + corpoDaRequisicao;
    
    const padroesSuspeitos = [
        { regex: /(\.env|config\.php|wp-admin)/i, tipo: "Busca por ficheiros sensíveis" },
        { regex: /(UNION|SELECT|INSERT|DROP|--)/i, tipo: "Tentativa de Injeção de SQL (SQLi)" },
        { regex: /(<script>|javascript:|<img)/i, tipo: "Tentativa de XSS" }
    ];

    let ataqueDetectado = false;

    for (let padrao of padroesSuspeitos) {
        if (padrao.regex.test(dadosParaAnalisar)) {
            logsMonitoramento.unshift({
                ip: ipOrigem,
                detalhes: `${padrao.tipo} bloqueado pelo IDS.`
            });
            ataqueDetectado = true;
            break;
        }
    }

    if (ataqueDetectado) {
        return res.status(403).send("Acesso Negado: Atividade maliciosa detetada e registada pelo IDS.");
    }

    next();
});

app.get('/api/logs', (req, res) => {
    return res.json(logsMonitoramento);
});

app.post('/api/logs', (req, res) => {
    const { ip, detalhes } = req.body;
    if (!ip || !detalhes) return res.status(400).json({ error: 'Os campos IP e Detalhes são obrigatórios.' });
    
    logsMonitoramento.unshift({ ip, detalhes: `[Reporte Manual] ${detalhes}` });
    return res.status(201).json({ message: 'Evento registado no sensor IDS com sucesso.' });
});

//aula web dev
let users = [
    { id: 1, name: 'Alice', age: 19, email: 'alice@example.com' },
    { id: 2, name: 'Arthur', age: 22, email: 'arthur@example.com' },
    { id: 3, name: 'Gabriel', age: 17, email: 'gabriel@example.com' },
];

app.get('/users', (req, res) => {
    return res.json(users);
});

app.post('/users', (req, res) => {
  const { name, age, email } = req.body;
  if (!name || !age || !email) return res.status(400).json({ error: 'Missing name, age or email' });
  
  const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id: newId, name, age, email };
  users.push(newUser);
  return res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json(user);
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, age, email } = req.body;
  const userIndex = users.findIndex(u => u.id === userId);  
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  
  const updatedUser = { id: userId, name, age, email };
  users[userIndex] = updatedUser;
  return res.json(updatedUser);
});

app.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  
  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;
  return res.json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId); 
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  
  users.splice(userIndex, 1);
  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
  console.log(`Aceda a http://localhost:3000 para ver o painel IDS.`);
});