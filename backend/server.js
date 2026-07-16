const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Netflix Clone API is running' });
});

app.use('/api', authRoutes);
app.use('/api/movies', movieRoutes);

module.exports = app;