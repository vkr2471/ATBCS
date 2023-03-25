const passport = require('passport');
require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../database/schemas/user.js');


const {genpassword,validPassowrd} = require('../lib/passwordUtils.js');
const customFields={
    usernameField:'email',
    passwordField:'password'
}

const verifyCallback=(username,password,done)=>{
    User.findOne({email:username}).then((user)=>{
        if(!user){
            return done(null,false,{message:'No user with that email'});
        }
        const isValid =validPassowrd(password,user.hash,user.salt);
        if(!isValid){
           
            return done(null,false,{message:'Incorrect password'});
        }
        if(!user.isVerified){
            return done(null,false,{message:'Please verify your email'});
        }
        else{
            return done(null,user);
        }
    }).catch((error)=>
    {
        done(error);
    })
}
const strategy =new LocalStrategy(customFields,verifyCallback);


passport.use(strategy);
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});