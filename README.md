# Expense Tracker Application

A full-stack expense tracker application that allows users to record their expenses and visualize spending patterns through interactive charts.

## Features

- **Expense Management**:
  - Add new expenses with amount, category, description, and date
  - Edit existing expenses
  - Delete expenses
- **Data Visualization**:
  - Pie chart showing category distribution
  - Bar chart displaying monthly expenses
- **Responsive Design**: Works on both desktop and mobile devices
- **User Authentication**: Allows multiple users to track expenses individually

## Technologies Used

### Frontend

- React.js
- Chart.js (for data visualization)
- Axios (for API calls)

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (for authentication)

## Live Demo

The application is deployed and can be accessed at:
[Frontend URL](https://expense-assignment.vercel.app/)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### Setup Instructions

1. **Clone the repository**
   ```bash
       git clone https://github.com/your-username/expense-tracker.git
       cd expense-tracker
   ```
2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the backend directory with the following:

   ```
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Run the Application**

   - In one terminal:
     ```bash
     cd backend
     npm start
     ```
   - In another terminal:
     ```bash
     cd frontend
     npm start
     ```

6. **Access the Application**
   Open your browser and visit `http://localhost:5173`

## API Endpoints

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | /api/expenses       | Add a new expense          |
| GET    | /api/expenses       | Retrieve all expenses      |
| PUT    | /api/expenses/:id   | Update an existing expense |
| DELETE | /api/expenses/:id   | Delete an expense          |
| POST   | /api/users/register | Register a new user        |
| POST   | /api/users/login    | Login user                 |

## Application Architecture

The application follows a client-server architecture with a React frontend and Node.js/Express backend:

1. **Frontend**:

   - Components for displaying and managing expenses
   - Chart components for data visualization
   - Form components for user input
   - Services layer for API communication

2. **Backend**:

   - RESTful API endpoints
   - Controller layer for business logic
   - Model layer for data structure
   - Database connection (MongoDB)

3. **Database**:
   - MongoDB collections for expenses and users
