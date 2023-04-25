const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type:String,
        required: true
    },
    last_name: {
        type:String,
        required: true
    },
    email: {
        type:  String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    income: {
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    car: {
        type: String,
        required: false
    },
    quote: {
        type: String,
        required: false
    },
    phone_price: {
        type: Number,
        required: false
    }
})


module.exports = mongoose.model('User', userSchema)