const { DEFAULT_BUFFER_MINUTES, WORKING_HOURS } = require('../config/constants');
const { isTimeWithinWorkingHours, addMinutes } = require('../utils/timeUtils');


// For checking conflicts and suggesting alternative times
function checkForConflicts(proposedEvent, existingEvents = []) {
  const conflicts = [];
  const bufferMs = DEFAULT_BUFFER_MINUTES * 60 * 1000;

  existingEvents.forEach(existingEvent => {
    // Check if there are common participants
    const commonParticipants = existingEvent.participants.filter(
      participant => proposedEvent.participants.includes(participant)
    );

    if (commonParticipants.length > 0) {
      const proposedStart = new Date(proposedEvent.startTime).getTime();
      const proposedEnd = new Date(proposedEvent.endTime).getTime();
      const existingStart = new Date(existingEvent.startTime).getTime();
      const existingEnd = new Date(existingEvent.endTime).getTime();

      // Check for time overlap considering buffer time
      if (
        (proposedStart < existingEnd + bufferMs && proposedEnd > existingStart - bufferMs)
      ) {
        conflicts.push({
          existingEvent,
          conflictingParticipants: commonParticipants,
          conflictType: 'time_overlap'
        });
      }
    }
  });

  return conflicts;
}


// Suggest alternative times if conflicts exist
function suggestAlternativeTimes(proposedEvent, existingEvents = []) {
  const conflicts = checkForConflicts(proposedEvent, existingEvents);
  if (conflicts.length === 0) return [];

  const duration = getEventDuration(proposedEvent);
  const originalStart = new Date(proposedEvent.startTime);
  const originalEnd = new Date(proposedEvent.endTime);

  const suggestions = [];

  // 1. Try right after the conflicting event (with buffer time)
  const firstConflict = conflicts[0].existingEvent;
  const conflictEnd = new Date(firstConflict.endTime);
  const suggestion1 = createSuggestion(
    new Date(conflictEnd.getTime() + (DEFAULT_BUFFER_MINUTES * 60 * 1000)),
    duration
  );
  if (suggestion1) suggestions.push(suggestion1);

  // 2. Try before the conflicting event (with buffer time)
  const conflictStart = new Date(firstConflict.startTime);
  const suggestion2 = createSuggestion(
    new Date(conflictStart.getTime() - duration - (DEFAULT_BUFFER_MINUTES * 60 * 1000)),
    duration
  );
  if (suggestion2) suggestions.push(suggestion2);

  // 3. Try same time but next available slot (e.g., next hour)
  const suggestion3 = createSuggestion(
    new Date(originalStart.getTime() + 60 * 60 * 1000),
    duration
  );
  if (suggestion3) suggestions.push(suggestion3);

  // 4. Try earlier the same day (if possible)
  if (suggestions.length < 3) {
    const suggestion4 = createSuggestion(
      new Date(originalStart.getTime() - 60 * 60 * 1000),
      duration
    );
    if (suggestion4) suggestions.push(suggestion4);
  }

  // 5. Try next day at the same time (fallback)
  if (suggestions.length < 3) {
    const nextDay = new Date(originalStart);
    nextDay.setDate(nextDay.getDate() + 1);
    const suggestion5 = createSuggestion(nextDay, duration);
    if (suggestion5) suggestions.push(suggestion5);
  }

  return suggestions.slice(0, 3); // Return exactly 3 suggestions
}

// Helper function to create a suggestion
function createSuggestion(startTime, duration) {
  const endTime = new Date(startTime.getTime() + duration);

  if (isTimeWithinWorkingHours(startTime, endTime)) {
    return {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    };
  }
  return null;
}

// Helper function to get the duration of an event
function getEventDuration(event) {
  return new Date(event.endTime).getTime() - new Date(event.startTime).getTime();
}

module.exports = {
  checkForConflicts,
  suggestAlternativeTimes
};