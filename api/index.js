const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('../routes/auth');
const portfolioRoutes = require('../routes/portfolio');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://yoatw9.github.io', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/.netlify/functions/api/auth', authRoutes);
app.use('/.netlify/functions/api/portfolio', portfolioRoutes);

app.get('/.netlify/functions/api', (req, res) => {
  res.status(200).json({ status: 'Portfolio API is running' });
});

module.exports.handler = serverless(app);
