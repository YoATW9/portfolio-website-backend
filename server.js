const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./config/config');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://yoatw9.github.io', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Portfolio API is running' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
