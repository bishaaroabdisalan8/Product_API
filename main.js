const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();

const { connectToDatabase } = require('./database/connect');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('PRODUCTS API');
});

// Start server
app.listen(3000, async () => {
    console.log('Server is running on port 3000');

    // connect database
    await connectToDatabase();
});