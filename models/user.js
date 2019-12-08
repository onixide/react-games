const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 255,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);

