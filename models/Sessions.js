const mongoose = require('mongoose');

// Define a schema for your MongoDB document
const Schema = mongoose.Schema;

const SessionsSchema = new Schema({
    // Define fields and their data types
    dean_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    student_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    day_of_week : {
        type: String,
        enum: ['thursday', 'friday'],
        required: true,
    },
    start_time : {
        type: Date,
        required: true,
    },
    end_time : {
        type: Date,
        required: true,
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

// "day_of_week": "Thursday", // Day of the week for the time slot
//   "start_time": "10:00 AM",
//   "end_time": "11:00 AM",
//   "is_available": true, // Indicates whether the time slot is available

// Create a model from the schema
const Sessions = mongoose.model('Sessions', SessionsSchema);

// Export the model for use in your application
module.exports = Sessions;
