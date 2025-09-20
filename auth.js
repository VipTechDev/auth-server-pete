const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = [];

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).send({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, 'secretkey');
  res.send({ message: 'Login successful', token });
});

module.exports = router;