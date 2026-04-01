const router = require('express').Router();

const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const userController = require('../controllers/userController');

// ✅ Only admin can access these

router.get('/', auth, role('admin'), userController.getUsers);

router.put('/role/:id', auth, role('admin'), userController.updateUserRole);

router.put('/status/:id', auth, role('admin'), userController.updateUserStatus);

module.exports = router;