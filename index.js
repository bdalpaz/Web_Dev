const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

let users = [
    { id: 1, name: 'Alice', age: 19, email: 'alice@example.com' },
    { id: 2, name: 'Arthur', age: 22, email: 'arthur@example.com' },
    { id: 3, name: 'Gabriel', age: 17, email: 'gabriel@example.com' },
];

app.get('/users', (req, res) => {
    return res.json(users);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/users', (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Missing name, age or email' });
  }
  const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id: newId, name, age, email };
  users.push(newUser);
  return res.status(201).json(newUser);
});


app.get('/users', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  } else {
    return res.json(user);
  }});

  app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, age, email } = req.body;
    const userIndex = users.findIndex(u => u.id === userId);  
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = { id: userId, name, age, email };
    users[userIndex] = updatedUser;
    return res.json(updatedUser);
  });

  app.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
  
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;
    return res.json(updatedUser);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId); 
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    return res.status(204).send();
  });