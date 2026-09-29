require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 9000;

// Connect to MongoDB Atlas
connectDB();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Base test route
app.get('/', (req, res) => {
  res.send('Task 5 User Management API is running...');
});

// Mount user routes
app.use('/users', userRoutes);

// Start server listener
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});