const router = require('express').Router();

const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const controller = require('../controllers/recordController');

// CREATE record (only admin)
router.post('/', auth, role('admin'), controller.createRecord);

// GET records (all roles)
router.get('/', auth, role('admin', 'analyst', 'viewer'), controller.getRecords);

// UPDATE record (admin only)
router.put('/:id', auth, role('admin'), controller.updateRecord);

// DELETE record (admin only)
router.delete('/:id', auth, role('admin'), controller.deleteRecord);

module.exports = router;