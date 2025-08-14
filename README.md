# calendar-confilct

## How to Run This Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/RagulMani/calendar-confilct.git
   cd calendar-confilct
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

## Additional Commands

- **Build for production**
  ```bash
  npm run build
  ```

- **Run tests**
  ```bash
  npm test
  ```

Sample results, 

## Routes, 
http://localhost:3000/api/check-conflicts
http://localhost:3000/api/suggest-times

## Input json to get results, 

{
  "proposedEvent": {
    "title": "Team Meeting",
    "startTime": "2025-08-14T10:30:00Z",
    "endTime": "2025-08-14T11:30:00Z",
    "participants": ["user1", "user2"]
  },
  "existingEvents": [
    {
      "title": "Standup",
      "startTime": "2025-08-14T10:00:00Z",
      "endTime": "2025-08-14T11:30:00Z",
      "participants": ["user1", "user3"]
    }
  ]
}



## Sample Respone, 

{
    "hasConflict": true,
    "conflicts": [
        {
            "existingEvent": {
                "title": "Standup",
                "startTime": "2025-08-14T10:00:00Z",
                "endTime": "2025-08-14T11:30:00Z",
                "participants": [
                    "user1",
                    "user3"
                ]
            },
            "conflictingParticipants": [
                "user1"
            ],
            "conflictType": "time_overlap"
        }
    ]
}


## Sample Response

{
    "suggestions": [
        {
            "startTime": "2025-08-14T09:45:00.000Z",
            "endTime": "2025-08-14T10:45:00.000Z"
        },
        {
            "startTime": "2025-08-14T09:30:00.000Z",
            "endTime": "2025-08-14T10:30:00.000Z"
        },
        {
            "startTime": "2025-08-15T10:30:00.000Z",
            "endTime": "2025-08-15T11:30:00.000Z"
        }
    ]
}
