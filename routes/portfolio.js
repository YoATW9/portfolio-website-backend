const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const router = express.Router();

// Get portfolio data
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    res.json(portfolio || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio data' });
  }
});

// Update portfolio data (protected route)
router.put('/', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (portfolio) {
      Object.assign(portfolio, req.body);
      await portfolio.save();
    } else {
      await Portfolio.create(req.body);
    }
    res.json({ message: 'Portfolio updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating portfolio data' });
  }
});

// Update specific sections
router.put('/:section', auth, async (req, res) => {
  try {
    const { section } = req.params;
    const portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      const newData = { [section]: req.body };
      await Portfolio.create(newData);
    } else {
      portfolio[section] = req.body;
      await portfolio.save();
    }
    
    res.json({ message: `${section} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error updating ${section}` });
  }
});

module.exports = router;
