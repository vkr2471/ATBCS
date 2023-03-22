const mongoose = require('mongoose');
const airportschema = mongoose.Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
    }
});

module.exports = mongoose.model('airport', airportschema);
