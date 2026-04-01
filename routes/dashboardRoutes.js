const router = require('express').Router();

const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const dashboardController = require('../controllers/dashboardController');

// ✅ Get dashboard summary
// Admin + Analyst can access
router.get(
  '/',
  auth,
  role('admin', 'analyst'),
  dashboardController.getSummary
);

module.exports = router;