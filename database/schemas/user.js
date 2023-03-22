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
    password:{
        type: String,
        required: [true , "password must be provided"],
        minlength: [8 , "password must be at least 8 characters"],
        maxlength: [20 , "password must not be more than 20 characters"]
    },
    phone:{
        type: String,
        required: [true , "phone number must be provided"],
        unique: true
    },
    ffm:{
        type: Int16Array,
    },
    bookings:[
        {
            type: String
        }
    ]
});
module.exports = mongoose.model('user',userschema);
