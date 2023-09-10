const mongoose = require('mongoose');

// Define a schema for your MongoDB document
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Define fields and their data types
    timing: {
        type: Date,
        unique: true,
        required: true,
    },
    dean_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    student_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set default value to the current date
    },
    updateddAt: {
        type: Date,
        default: Date.now, // Set default value to the current date
    },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model for use in your application
module.exports = User;
