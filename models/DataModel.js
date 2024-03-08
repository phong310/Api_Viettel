const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true
    },
    data: {
        type: String,
        require: true,
    },
    syntax: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true
    },
    hot: {
        type: String,
        require: true,
    },
    register: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    }

}, { timestamps: true })

module.exports = mongoose.model("DataModel", DataSchema)
