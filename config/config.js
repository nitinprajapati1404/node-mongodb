
let is_debug = false;
if (process.env.is_DEBUG === 'true'){
    is_debug = true;
}
const mongoose = require('mongoose');

// Define MongoDB connection URL
const dbURI = process.env.MONGO_CONN_URL;

//IF YOUR MONDO DB IS SECURED THEN PLEASE CHANGE in env URL in following format :
//const dbURI = `mongodb://${username}:${password}@${host}:${port}/${databaseName}`;

// Create Mongoose connection
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;


// Event handlers for Mongoose connection
db.on('connected', () => {
    console.log(`Connected to MongoDB at ${dbURI}`);
});

db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

// db.on('disconnected', () => {
//     console.log('Disconnected from MongoDB');
// });

// Gracefully close the MongoDB connection on application termination
process.on('SIGINT', () => {
    db.close(() => {
        process.exit(0);
    });
});

// Export the Mongoose connection
module.exports = {
    db
};
