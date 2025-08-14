const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/check-conflicts', eventsController.checkConflicts);
router.post('/suggest-times', eventsController.suggestTimes);

module.exports = router;