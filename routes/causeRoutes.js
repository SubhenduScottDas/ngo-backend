const express = require('express');
const router = express.Router();
const causeController = require('../controllers/causeController');

// Route to get causes
router.get('/', causeController.listCauses);

// Route to get a cause
router.get('/:id', causeController.getCauseById);

// Route to create a new cause
router.post('/create', causeController.createCause);

// Route to update an existing cause
router.put('/update/:id', causeController.updateCause);

// Route to close a cause
router.put('/close/:id', causeController.closeCause);

// Route to donate to a cause
router.post('/donate/:id', causeController.donate);

module.exports = router;
