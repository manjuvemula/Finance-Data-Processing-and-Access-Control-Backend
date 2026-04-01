const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Middlewares
app.use(express.json());   // for parsing JSON
app.use(cors());           // allow frontend access

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
const errorHandler = require('./utils/errorHandler');

// ✅ Default Route (for testing)
app.get('/', (req, res) => {
  res.send('Finance Backend API is running...');
});

// ❌ Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

module.exports = app;