# Employee Polls Web App

A React/Redux application that allows employees to create polls, vote on them, and view a leaderboard of the most active users.

## Project Overview

This application allows employees to:
- Login with their credentials
- View unanswered and answered polls
- Answer polls by selecting one of two options
- Create new polls with two options
- See the voting results for polls
- View a leaderboard of users ranked by their participation

## Installation and Launch Instructions

Follow these steps to set up and run the project:

1. Clone the repository
   ```
   git clone https://github.com/your-username/employee-polls.git
   cd employee-polls
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:3000

## Testing

To run the unit tests:
```
npm test
```

## Project Structure

The application follows a modular architecture with the following structure:

```
/
├── components/                # React components
│   ├── layout/                # Layout components (Navbar, Layout, etc.)
│   ├── auth/                  # Authentication components and context
│   ├── polls/                 # Poll-related components
│   └── leaderboard/           # Leaderboard components
├── pages/                     # Next.js pages
├── store/                     # Redux store and state management
│   ├── slices/                # Redux slices (auth, polls, users)
│   └── thunks/                # Async thunks (auth, polls)
├── utils/                     # Utility functions and API
├── styles/                    # CSS styles
├── tests/                     # Unit tests
└── public/                    # Static assets
    └── avatars/               # User avatars
```

## Login Information

You can log in using one of the following accounts:

- **Username:** sarahedo
  **Password:** password123

- **Username:** tylermcginnis
  **Password:** abc321

- **Username:** mtsamis
  **Password:** xyz123

- **Username:** zoshikanlu
  **Password:** pass246

## Technologies Used

- React
- Next.js 
- Redux Toolkit
- Tailwind CSS
- Jest and React Testing Library

## Features

### Authentication
- Login with username and password
- Persistent login state
- Protected routes for authenticated users

### Polls
- View unanswered and answered polls
- Vote on polls
- Create new polls with two options
- See voting statistics

### Leaderboard
- View users ranked by their participation
- See how many polls each user has created and answered

## License

This project was developed as part of the Udacity React Nanodegree program.