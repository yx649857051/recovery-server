const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    phone: String,
    image: {
        type: String,
        default: '/static/images/userlogo.e273d4b7.png'
    },
    name: {
        type: String,
        default: '速回收'
    }
})

const Mine = mongoose.model('mine', schema);

module.exports = Mine;