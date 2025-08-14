class Event {
  constructor({ title, startTime, endTime, participants }) {
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.participants = participants || [];
  }
}

module.exports = Event;