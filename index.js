const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const authRoutes = require('./auth');

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/auth/get_message', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send({ message: 'User not logged in' });

  try {
    const decoded = jwt.verify(token, 'secretkey');
    res.send({ message: `Hello ${decoded.username}, here’s your secret message.` });
  } catch {
    res.status(403).send({ message: 'Invalid token' });
  }
});

app.listen(8080, () => {
  console.log('Listening at http://localhost:8080');
});