const { WORKING_HOURS } = require('../config/constants');

// Check if the proposed time is within working hours
function isTimeWithinWorkingHours(startTime, endTime) {
  const startHour = startTime.getHours();
  const endHour = endTime.getHours();
  
  return (
    startHour >= WORKING_HOURS.start && 
    endHour <= WORKING_HOURS.end &&
    startTime.getDay() === endTime.getDay() // Same day
  );
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

module.exports = {
  isTimeWithinWorkingHours,
  addMinutes
};