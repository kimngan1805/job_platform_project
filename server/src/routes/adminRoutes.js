const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/companies', adminController.getCompaniesBySections);
router.get('/ai-analyze', adminController.analyzeWithAI);
router.post('/update-status', adminController.updateStatus);

module.exports = router;