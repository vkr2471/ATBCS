const mongoose = require('mongoose');
const flightschema = mongoose.Schema({
    model: {
        type: String,
        required: [true, 'model must be provided']
    },
    ids: [{
        type: String,
    }],
    seats: [{
        fc:{
            type: Int16Array,
        },
        bc:{
            type: Int16Array,
        },
        ec:{
            type: Int16Array,
        }
    }]
});

module.exports = mongoose.model('flight', flightschema);
