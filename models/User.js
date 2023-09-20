const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define a schema for your MongoDB document
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Define fields and their data types
    universityId: {
        type: String,
        unique: true, 
        required: true,
    },
    email: {
        type: String,
        unique: true, 
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    role : {
        type: String,
        enum: ['student', 'dean'],
        required: true,
    },
    password: { 
        type: String, 
        required: true,
        // select: false 
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


// Add a pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', userSchema);

// Export the model for use in your application
module.exports = User;
