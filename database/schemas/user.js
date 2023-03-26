const mongoose = require("mongoose");
const userschema = mongoose.Schema({
    name:{
        type: String,
        required: [true , "name must be provided"],
        trim: true,
        maxlength: [40 , "name must not be more than 40 characters"]
    },
    dob:{
        type: Date,
        required: [true , "dob must be provided"]
    },
    email:{
        type: String,
        required: [true , "email must be provided"],
        unique: true
    },
    hash:{
        type: String,
        required: [true , "password must be provided"],
    },
    salt:{
        type: String,
    },

    isVerified:{
        type: Boolean,

    },
    emailToken:{
        type: String,

    },

    phone:{
        type: String,
        required: [true , "phone number must be provided"],
        unique: true
    },
    ffm:{
        type: Number,
        default: 0
    },
    bookings:[
        {
            type: String
        }
    ]
});
module.exports = mongoose.model('user',userschema);
