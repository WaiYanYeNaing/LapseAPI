const Mongoose = require('mongoose');

const CardSchema = Mongoose.Schema({
    card_description: {
        type: String,
        require: true
    },

})

module.exports = Mongoose.model('Card', CardSchema)