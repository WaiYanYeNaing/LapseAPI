const Mongoose = require('mongoose');

const StatusSchema = Mongoose.Schema({
    status1: {
        type: Number,
        require: true
    },
    status2: {
        type: Number,
        require: true
    },
    status3: {
        type: Number,
        require: true
    },
    status4: {
        type: Number,
        require: true
    },
    status5: {
        type: Number,
        require: true
    }
})

module.exports = Mongoose.model('Status', StatusSchema)