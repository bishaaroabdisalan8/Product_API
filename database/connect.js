const mongoose = require('mongoose');

const dns =require("node:dns/promises")
dns.setServers(["1.1.1.1"])

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = { connectToDatabase };