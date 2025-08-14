const conflictService = require('../services/conflictService');

exports.checkConflicts = (req, res) => {
  try {
    const { proposedEvent, existingEvents } = req.body;
    const conflicts = conflictService.checkForConflicts(proposedEvent, existingEvents);
    
    res.json({
      hasConflict: conflicts.length > 0,
      conflicts
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.suggestTimes = (req, res) => {
  try {
    const { proposedEvent, existingEvents } = req.body;
    const suggestions = conflictService.suggestAlternativeTimes(proposedEvent, existingEvents);
    
    res.json({
      suggestions
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};