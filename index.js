// index.js

const express = require('express');
const config = require('./src/configs/config');
const db = require("./src/configs/db");
const authRoutes = require('./src/routes/authRoutes');


const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is working!' });
});

// Database connection and server start
const port = process.env.PORT || config.PORT;

db.connect()
  .then(() => {
      console.log("Database connected successfully");

      app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
      });
  })
  .catch(err => {
      console.error("Database connection error:", err);
      process.exit(1); // Stop server if DB connection fails
  });

// Optional: handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
