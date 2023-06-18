# Wine Table CRUD App

This is a Wine Table CRUD application built with Next.js for the frontend and Express.js for the backend. It allows you to perform basic CRUD operations (Create, Read, Update, Delete) on wine data.

## Prerequisites

- Node.js (version 14 or above) and npm (Node Package Manager) should be installed on your machine.

## Backend Setup

1. Navigate to the `backend` directory: `cd backend`
2. Install the dependencies: `npm install`
3. Start the backend server: `npm run dev`
4. The backend server will start running at `http://localhost:5000`

## Frontend Setup

1. Navigate to the `frontend` directory: `cd frontend`
2. Install the dependencies: `npm install`
3. Start the frontend development server: `npm run dev`
4. The frontend application will be accessible at `http://localhost:3000`

## Usage

1. Open your web browser and visit `http://localhost:3000` to access the Wine Table CRUD application.
2. You can perform CRUD operations on the wine data using the provided user interface.
3. Any changes made will be reflected in real-time.

## Additional Information

- The backend server runs on port 5000, and the frontend development server runs on port 3000. Make sure these ports are available on your machine.
- The backend API endpoints are prefixed with `/wines` for fetching all wines or `/wines/{id}` for fetching a specific wine by its ID.
- The frontend application interacts with the backend API to perform CRUD operations.
- Make sure to configure the backend API URL in the frontend code (in the `apiUrl` variable) to match the actual backend server URL.
