const mongoose = require('mongoose');
const flightschema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'model must be provided']
    },
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
    }],
    fare: [{
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
