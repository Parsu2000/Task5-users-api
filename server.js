require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 10000;

// Connecting to MongoDB
connectDB();

// Creating built-in middleware to parse incoming JSON payloads into req.body
app.use(express.json());

// Mounting the user routes on /users
app.use('/users', userRoutes);

// Rooting test route
app.get('/', (req, res) => {
  res.send('Task 5 API is running...');
});
``````
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
