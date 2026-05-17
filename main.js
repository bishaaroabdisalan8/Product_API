const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();

const { connectToDatabase } = require('./database/connect');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

const PORT= process.env.PORT || 3000;



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
app.listen(PORT,() => {
    
     connectToDatabase();
     console.log('Server is running on port'+PORT);

    
});

    
