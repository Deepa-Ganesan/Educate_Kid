const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./src/database/db');
const cors = require('cors');
const path = require('path');

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // Use express.json() for JSON parsing

// Static folder for file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import the routes
const authRoutes = require('./src/routes/auth');
const formRoutes = require('./src/routes/formRoutes');
const instituteRoutes = require('./src/routes/institute');
const scholarshipRoutes = require('./src/routes/scholarshipRoutes');

// Use the routes
app.use('/api/users', authRoutes);
app.use('/api/form', formRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/scholarships', scholarshipRoutes); // Corrected path

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});