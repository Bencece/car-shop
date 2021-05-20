const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    itemid: {
        type: Number
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    prize: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 1
    },
    image: {
        type: String
    }
})

module.exports = Product