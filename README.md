# Finance-Data-Processing-and-Access-Control-Backend
A role-based finance backend system built with Node.js, Express, and MongoDB. It supports JWT authentication, financial record management, dashboard analytics, and secure access control.
Backend system for managing financial records with secure role-based access control. Features JWT authentication, CRUD operations for income/expenses, filtering, user-specific data, and dashboard analytics. Built with clean architecture, validation, and centralized error handling.

**API tested using Postman. Collection can be shared if required.**

## Key Features

- JWT Authentication (Login/Register)
- Role-Based Access Control (Viewer, Analyst, Admin)
- CRUD Operations for Financial Records
- Dashboard Analytics (Income, Expense, Balance)
- Filtering & Pagination
- Input Validation & Error Handling
- Protected Routes with Middleware
- MongoDB Integration using Mongoose


## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs

##Project Structure
controllers/
models/
routes/
middleware/
config/
utils/
server.js
app.js

## Setup Instructions
1. Clone the repository
git clone <your_repo_link>

2. Install dependencies
npm install

3. Create .env file
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=5000

4. Run server
npm run dev

##API Endpoints
### Auth
POST /api/auth/register  
POST /api/auth/login  

### Records
POST /api/records  
GET /api/records  
PUT /api/records/:id  
DELETE /api/records/:id  

### Dashboard
GET /api/dashboard  

### Users (Admin)
GET /api/users  
PUT /api/users/:id/role  

## Role Permissions
  Viewer -> Read-only access
- Analyst -> View + analytics
- Admin → Full access (CRUD + user management)

  ## Error Handling
- Centralized error handling middleware
- Proper HTTP status codes
- Validation for inputs

## Future Improvements
- Add frontend dashboard
- Implement refresh tokens
- Add unit testing
- Deploy to cloud

 URL    ---->   http://localhost:5000/

<img width="1909" height="747" alt="image" src="https://github.com/user-attachments/assets/736bff45-13f9-4b45-ac18-68cc938626a4" />

