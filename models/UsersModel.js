const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    confirm: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: false,
    },
    status: {
        type: Number,
        required: true
    },
}, { timestamps:true})

module.exports = mongoose.model("UserModel", UsersSchema)