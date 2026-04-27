# AgriSmart 

A full-stack web application that helps farmers optimize fertilizer usage for better crop yields through soil analysis, weather data, and smart recommendations.

## Features

- **Soil Analysis** - Analyze soil nutrients and conditions
- **Smart Recommendations** - Get precise fertilizer suggestions based on soil, crop, and weather data
- **Weather Integration** - Plan fertilizer usage according to weather conditions
- **Dashboard** - Track soil health and farming metrics
- **User Authentication** - Secure login and signup system

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, bcryptjs
- **APIs**: Weather API integration

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash   ```
   
5. Open `frontend/home.html` in your browser

## Project Structure

```
├── backend/
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── server.js     # Main server file
├── frontend/
│   ├── analyze.html  # Soil analysis page
│   ├── dashboard.html# User dashboard
│   ├── weather.html  # Weather information
│   ├── contact.html   # Contact page
│   ├── login.html    # Login page
│   ├── signup.html   # Signup page
│   └── *.css         # Stylesheets
└── package.json
```

## License

ISC
