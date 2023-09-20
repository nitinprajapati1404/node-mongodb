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
// Create a model from the schema
const Sessions = mongoose.model('Sessions', SessionsSchema);

// Export the model for use in your application
module.exports = Sessions;
