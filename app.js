//check if user is already registered while registering

require("dotenv").config();
const path = require("path");
const fs = require("fs");

const stripe = require("stripe")(
  "sk_test_51MnnkzSARgmBpkGyMJdzua5kXod303wNYtLJqvKr6TMAgdFJCFakSa8aQFEXUxNfMk7ZqFu6EwmL9AEiQz2TCIRm00RpPNyrGj"
);

isAuth = require("./backend/middleware/isAuth.js");
const multer = require("multer");
const uploader = multer({ dest: "uploads/" });
const fileupload = require("express-fileupload");

const cors = require("cors");

const { connect, mongoose } = require("./database/connect.js");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const home = require("./backend/routes/home.js");
const search = require("./backend/routes/search.js");
app.use(fileupload());
const crypto = require("crypto");
//const findflights=require('./backend/middleware/findflights.js');

//const login=require('./backend/controllers/login.js');

const user = require("./database/schemas/user.js");

const session = require("express-session");
const flight = require("./database/schemas/flights.js");

const MongoStore = require("connect-mongo")(session);
const findflights = require("./backend/middleware/findflights.js");
const passport = require("passport");
const {
  genpassword,
  validPassowrd,
} = require("./backend/lib/passwordUtils.js");
const { loginpage } = require("./backend/controllers/login.js");

const ensure = require("connect-ensure-login");
const { verify } = require("./backend/lib/verifycowincert.js");
const { upload } = require("./backend/lib/upload.js");
const { rename1 } = require("./backend/lib/rename.js");
const schedule=require('./database/schemas/schedule.js');

const {
  sendVerificationMail,
} = require("./backend/lib/sendVerificationMail.js");
const airport = require("./database/schemas/airports.js");
const { log } = require("console");

const{sendSuccessEmail}=require('./backend/lib/sendSuccessEmail.js');

const start = async () => {
  try {
    db = await connect();
    app.listen(5002, console.log("Listening on port 5002..."));
  } catch (error) {
    console.log(error);
  }
};

start();

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //one day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./backend/config/passport.js");

app.get("/", home);
//app.use('/search',findflights, search);
app.get("/login", loginpage);

app.get("/register", (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="name">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br>Enter Email:<br><input type="email" name="email">\
                    <br>Enter Phone:<br><input type="text" name="phone">\
                    <br>Enter Date of Birth:<br><input type="date" name="dob">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

app.post("/register", async (req, res, next) => {
  const saltHash = genpassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newuser = await new user({
    email: req.body.email,
    hash: hash,
    salt: salt,
    name: req.body.name,
    phone: req.body.phoneNumber,
    dob: req.body.DOB,
    emailToken: crypto.randomBytes(64).toString("hex"),
    isVerified: false,
    ffm: 0,
    pl:null,
    sl:null,

  });
  await newuser
    .save()
    .then((user) => {
      console.log(user);
    })
    .then(async () => {
      await sendVerificationMail(newuser);
      res.redirect("/verify-email");
    })
    .catch((error) => {
      console.log(Object.keys(error.keyPattern));
      if (Object.keys(error.keyPattern)[0] == "email") {
        res.status(400);
        res.send("Email already registered");
      } else if (Object.keys(error.keyPattern)[0] == "phone") {
        res.status(400);
        res.send("Phone number already registered");
      }
    });
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login-error" }),
  (req, res, next) => {
    //console.log(req.user);
    const d = { user: req.user.id, session: req.session };
    res.send(d);
    next();
  }
);

app.get("/getcookie", (req, res, next) => {
  console.log(req);
  res.send(req.cookies);
});

app.get("/airportdata", (req, res, next) => {
  airport.find({}).then((data) => {
    const airportdata = data.map((item) => {
      return { city: item.name, code: item.code };
    });
    res.json(airportdata);
  });
});

app.get("/login-error", (req, res, next) => {
  res.status(400);
  res.send("Invalid Username or Password");
});

app.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
  res.redirect("/");
});
app.post("/search", ensure.ensureLoggedIn({ redirectTo: "/login" }), search);

app.get("/verify-email", (req, res, next) => {
  const form = "<h1>Verify Email your email</h1>";
  res.send(form);
});
app.get("/verify-email/:id", (req, res, next) => {
  user.findOne({ emailToken: req.params.id }).then((user) => {
    if (!user) {
      res.status(400);
      res.send("You have not registered yet");
    } else {
      user.isVerified = true;
      user.emailToken = null;
      user
        .save()
        .then((user) => {
          res.send('<a href="/login">Click here to login ');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});

app.get("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  user.findById(req.params.id).then((user) => {
    console.log(user);
    res.send({
      name: user.name,
      phone: user.phone,
      email: user.email,
      dob: user.dob,
      ffm: user.ffm,
      bookings: user.bookings,
    });
  });
});

//app.get("/verify-cert", verify, (req, res, next) => {});

/*app.get("/upload", (req, res, next) => {
  const form =
    '<h1>Upload your image</h1><form method="post" action="upload" enctype="multipart/form-data">\
                    <input type="file" name="image">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});*/

/*app.post("/upload", upload.single("image"), rename1, (req, res, next) => {
  res.send("uploaded");
});*/

app.get("/search/:source/:destination/:date/:type/:seats", findflights);
app.get("/flights", (req, res, next) => {
  flight.find({}).then((data) => {
    res.send(data);
  });
});

app.post("/book", async (req, res, next) => {
  const data = await JSON.parse(req.body.data);
  const usered = await user.findById(data.userId);
  const files = req.files.image;
console.log(req.body)

//check if pending request exists

  // if(usered.pl!=null)
  // {
  //   res.send("it seems you already have pending payment you can can either pay or cancel the previous booking")
  // }
  usered.data=data ;

  
  //usered.save();
  const used_ffm=data.ffmused;
  const day =data.details.date;
  console.log(day)
  const seat = data.details.class;
  const nadults=data.details.adults;
  const nchildren=data.details.children;
  const ninfants=data.details.infants;
   const dayschedule =await schedule.findOne({date:day});
   console.log(dayschedule)
   const flightid=data.flightId;
   const choosenflight=await dayschedule.flights.find((flight)=>flight._id==flightid);

  const ffm=Math.round((100*data.duration)*(nadults+nchildren+ninfants));
   const adultcost=choosenflight.ticketfare[seat];
   let totalcost = adultcost*(nadults+nchildren)+0.5*adultcost*ninfants;
   if(used_ffm)
   {


      usered.prev_ffm=usered.ffm;

      const ffmused=user.ffm;
      const discount =Math.round(ffmused/1000)*100;
      usered.ffm=0;
      totalcost=totalcost-discount;

   }

   usered.flight_cost = totalcost;
   // usered.save();
    usered.temp_ffm=ffm;
    await usered.save();

  try {
    if (!fs.existsSync(__dirname + `/backend/images/${usered.email}`)) {
      fs.mkdirSync(__dirname + `/backend/images/${usered.email}`);
    }
  } catch (err) {
    console.log(err);
  }
  try {
    for (const file of files) {
      const fileName = file.name;
      const path = __dirname + `/backend/images/${usered.email}/` + fileName;

      file.mv(path, (err) => {
        console.log(err);
      });
    }
  } catch (err) {
    const fileName = files.name;
    const path = __dirname + `/backend/images/${usered.email}/` + fileName;
    files.mv(path);
  }
  console.log(data);
});

app.get("/payment/:id", async (req, res, next) => {
  console.log(req.user);



    user1 =await user.findOne({pl:req.params.id})

    if(!user1)
    {
      return res.send("oops something went wrong")
    }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Flight-Ticket',
            },
            unit_amount: user1.flight_cost*100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5002/success/${user1.sl}`,
      cancel_url: 'http://localhost:5002/cancel',
    });
  
    res.redirect(303, session.url);

})

app.get('/success/:id',async(req,res,next)=>{
    let user1 =await user.findOne({sl:req.params.id})
    if(!user1)
    {
      return res.send("oops something went wrong")
    }
    //update ffm
    //update pl
    //update sl
    //remove PL , add it to bookings
    //reduce flight tickets 
    await sendSuccessEmail(user1);

    user1.prev_ffm=0;
    user1.ffm = user1.ffm + user1.temp_ffm;
    user1.temp_ffm=0;
    user1.bookings.push(user1.data);
    user1.data=null;
    user1.pl=null;
    user1.sl=null;
    user1.flight_cost=0;

    await user1.save()
    res.send("payment successful")
})

app.get("/ffm/:id",async (req,res,next)=>{
  const user1 =await user.findById(req.params.id)
  if(!user1){
    return res.send("oops something went wrong")
  }
  res.send({ffm:user1.ffm})
}
)

app.get("/cancel/:id",async(req,res,next)=>{
  const user1 =await user.findOne({pl:req.params.id})
  if(!user1){
    res.send("oops look likes the payment was already cancelled/ invalid link")
  }
  user1.data=null;
  user1.pl=null;
  user1.sl=null;
  user1.flight_cost=0;
  user1.temp_ffm=0;
  user.ffm=user1.prev_ffm;
  user1.prev_ffm=0;
  await user1.save();
  res.send("payment cancelled")
})
