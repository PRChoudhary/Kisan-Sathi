const express = require('express');
const router = express.Router();
const { saveField, getFields, updateField, deleteField } = require('../controllers/fieldsController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.use(optionalAuth);

router.post('/', saveField);
router.get('/', getFields);
router.put('/:id', updateField);
router.delete('/:id', deleteField);

module.exports = router;
