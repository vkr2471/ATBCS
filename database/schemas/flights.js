const mongoose = require('mongoose');
const flightschema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },
    seats: {
        fc:{
            type: Number,
        },
        bc:{
            type: Number,
        },
        ec:{
            type: Number,
        }
    },
});

module.exports = mongoose.model('flight', flightschema);
