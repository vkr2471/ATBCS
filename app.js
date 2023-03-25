
//check if user is already registered while registering



require('dotenv').config();

isAuth=require('./backend/middleware/isAuth.js');



const {connect,mongoose} = require('./database/connect.js');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const home=require('./backend/routes/home.js');
const search=require('./backend/routes/search.js');

const crypto=require('crypto');
//const findflights=require('./backend/middleware/findflights.js');

//const login=require('./backend/controllers/login.js');


const user=require('./database/schemas/user.js');


const session=require('express-session');

const MongoStore=require('connect-mongo')(session);

const passport=require('passport');
const { genpassword,validPassowrd } = require('./backend/lib/passwordUtils.js');
const { loginpage } = require('./backend/controllers/login.js');

const ensure=require('connect-ensure-login');

const {sendVerificationMail}=require('./backend/lib/sendVerificationMail.js');




const start = async () => {
    try{
         db=await connect();
        app.listen(3000,  
         console.log('Listening on port 3000...'));
         
        

    }catch(error){
        console.log(error);
    }
}
start();


const sessionStore=new MongoStore(
    {                 
         
         mongooseConnection:mongoose.connection,
        collection:'sessions',
    }
)
 
app.use(session(
    {
        secret:'some secret',
        resave:false,
        saveUninitialized:true,
        store:sessionStore,
        cookie:{
            maxAge:1000*60*60*24//one day
        }   

    }
))

app.use(passport.initialize());
app.use(passport.session());
require('./backend/config/passport.js');

app.get('/', home);
//app.use('/search',findflights, search);
app.get('/login',loginpage);

app.get('/register',(req,res,next)=>
{

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="name">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br>Enter Email:<br><input type="email" name="email">\
                    <br>Enter Phone:<br><input type="text" name="phone">\
                    <br>Enter Date of Birth:<br><input type="date" name="dob">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

})

app.post('/register',async(req,res,next)=>
{
    const saltHash =genpassword(req.body.password);
    const salt=saltHash.salt;
    const hash=saltHash.hash;
    const newuser =await new user({
        email:req.body.email,
        hash:hash,
        salt:salt,
        name:req.body.name,
        phone:req.body.phone,
        dob:req.body.dob,
                            emailToken:crypto.randomBytes(64).toString('hex'),
                    isVerified:false,
        ffm:0,

    })
    await newuser.save().then((user)=>{
        console.log(user);

    }).catch((error)=>{
        console.log(error);
    });
    await sendVerificationMail(newuser);
    res.redirect('/verify-email');
});


app.post('/login',passport.authenticate('local',{failureRedirect:'/login',successReturnToOrRedirect:'/'}));


app.get('/logout',(req,res,next)=>{
    req.logout();
    res.redirect('/login');
    res.redirect('/');
});
app.post('/search',ensure.ensureLoggedIn({redirectTo:'/login'}),search);




app.get('/verify-email',(req,res,next)=>{
    const form = '<h1>Verify Email your email</h1>'
    res.send(form);
})
app.get('/verify-email/:id',(req,res,next)=>{

    user.findOne({emailToken:req.params.id}).then((user)=>{
        if(!user){
            res.send('Invalid token');
        }
        else{
            user.isVerified=true;
            user.emailToken=null;
            user.save().then((user)=>{
                res.send('<a href="/login">Click here to login ');
            }).catch((error)=>{
                console.log(error);
            })
        }
    }).catch((error)=>{
        console.log(error);
    })



})











