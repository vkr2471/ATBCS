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
//const { verify } = require("./backend/lib/verifycowincert.js");
const { upload } = require("./backend/lib/upload.js");
const { rename1 } = require("./backend/lib/rename.js");
const schedule = require("./database/schemas/schedule.js");

let image = fs
  .readFileSync("./backend/mailbody/Cloud9logo.png")
  .toString("base64");
const templateHtml = require("./backend/mailbody/ticketConfirmation.js");

const {
  sendVerificationMail,
} = require("./backend/lib/sendVerificationMail.js");
const airport = require("./database/schemas/airports.js");
const { log } = require("console");

const { sendSuccessEmail } = require("./backend/lib/success.js");
//const { html_to_pdf } = require("./backend/lib/test1.js");
const qrcode = require("qrcode");

const { forgotpassword } = require("./backend/lib/forgotpassword.js");
const {refundmail}=require('./backend/lib/refundmail.js');

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
    pl: null,
    sl: null,
    flight_cost: 0,
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

app.get("/search/:trip/:source/:destination/:date/:type/:seats", findflights);
app.get(
  "/search/:trip/:source/:destination/:date1/:date2/:type/:seats",
  findflights
);
app.get("/flights", (req, res, next) => {
  flight.find({}).then((data) => {
    res.send(data);
  });
});

app.post("/book", async (req, res, next) => {
  const data = await JSON.parse(req.body.data);
  const usered = await user.findById(data.userId);
  const files = req.files.image;
  console.log(req.body);

  //check if pending request exists

  // if(usered.pl!=null)
  // {
  //   res.send("it seems you already have pending payment you can can either pay or cancel the previous booking")
  // }
  usered.data = data;
  console.log(data);

  //usered.save();
  const used_ffm = data.ffmUsed;
  const day = data.details.date;
  const day1 = data.details.returndate;
  console.log(day);
  const seat = data.details.class;
  const nadults = data.details.adults;
  const nchildren = data.details.children;
  const ninfants = data.details.infants;
  const dayschedule = await schedule.findOne({ date: day });
  const dayschedule1 = await schedule.findOne({ date: day1 });
  const flightid = data.flightId;
  const flightid1 = data.flightId1;
  const choosenflight = await dayschedule.flights.find(
    (flight) => flight._id == flightid
  );
  console.log(choosenflight);
  let choosenflight1;
  const ffm = Math.round(
    100 * data.duration * (nadults + nchildren + ninfants)
  );
  let adultcost = choosenflight.ticketfare[seat];
  if (flightid1 != null) {
    choosenflight1 = await dayschedule1.flights.find(
      (flight) => flight._id == flightid1
    );
    console.log(choosenflight1);
    adultcost =
      choosenflight.ticketfare[seat] + choosenflight1.ticketfare[seat];
  }
  let totalcost =
    adultcost * (nadults + nchildren) + 0.5 * adultcost * ninfants;
  if (used_ffm) {
    usered.prev_ffm = usered.ffm;

    const ffmused = usered.ffm;
    console.log(ffmused);
    const discount = Math.floor(ffmused / 1000) * 100;
    console.log(discount);
    const meow = discount * 10;
    usered.ffm = ffmused - meow;
    totalcost = totalcost - discount;
  }

  usered.flight_cost = totalcost;
  // usered.save();
  console.log("ffm is", ffm);
  usered.temp_ffm = ffm;
  await usered.save();
  console.log(usered.temp_ffm);
  try {
    if (!fs.existsSync(__dirname + `/backend/images`)) {
      fs.mkdirSync(__dirname + `/backend/images`);
    }
    if (!fs.existsSync(__dirname + `/backend/images/${usered.email}`)) {
      fs.mkdirSync(__dirname + `/backend/images/${usered.email}`);
    }
  } catch (err) {
    console.log(err);
    x;
  }
  try {
    for (const file of files) {
      let r = crypto.randomBytes(16).toString("hex");
      const fileName = file.name + r + ".png";
      const path =
        __dirname + `/backend/images/${usered.email}/` + fileName + r + ".png";

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
  res.send("Verification under process. Please check your email for updates");
});

app.get("/payment/:id/:flag", async (req, res, next) => {
  let user1 = await user.findOne({ pl: req.params.id });

  if (!user1) {
    return res.send("oops something went wrong");
  }
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Flight-Ticket",
          },
          unit_amount: user1.flight_cost * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/success/${user1.sl}`,
    cancel_url: "http://localhost:5002/cancel",
  });
  let user2 = await user.findOne({ pl: req.params.id });

  user2.session_id = session.id;
  console.log(user2.session_id);
  await user2.save();
  // let user3 = await user.findOne({ pl: req.params.id });
  // console.log("3",user3.session_id)

  if (req.params.flag === "0") {
    res.send(session.url);
  } else {
    res.redirect(303, session.url);
  }
});

app.get("/success/:id", async (req, res, next) => {
  let user1 = await user.findOne({ sl: req.params.id });
  if (!user1) {
    return res.send("oops something went wrong");
  }
  //update ffm
  //update pl
  //update sl
  //remove PL , add it to bookings
  //reduce flight tickets
  user1.data.bookingID = crypto.randomBytes(64).toString("hex");
  

  //finish this and update send success email


    user1.prev_ffm = 0;
    user1.data.session_id = user1.session_id;
    (user1.session_id = null),
      // user1.data.pi=req.params.pi;
      // console.log("fingers crossed")
      // console.log(user1.data.pi)
      console.log(user1.temp_ffm);

      const options=user1.data.details.option;
      if(options==="one-way"){
        const flightId=user1.data.flightId;
        const day1=user1.data.details.date;
        const date=await schedule.findOne({date:day1});
        const type=user1.data.details.class;
        const seats=user1.data.details.passengers;
        var isavailable=false;
        
        const flights1=date.flights.filter((flight)=>{
          if(flight._id==flightId){
            if (flight.totalseats[type] - flight.seatsbooked[type] >= seats) {
              flight.seatsbooked[type] += seats;
              isavailable=true;
              
            } else {
              isavailable=false;
            }
          }
          return flight
        });
        console.log(flights1);
        if(isavailable){
          await sendSuccessEmail(user1);
         // const date1 = await schedule.findOne({ date: day1 });
          setTimeout(async () => {
            date.flights=flights1;
            await date.save();
            user1.ffm = user1.ffm + user1.temp_ffm;
        user1.bookings.push(user1.data);
        
        user1.data = null;
        user1.pl = null;
        user1.sl = null;
        user1.flight_cost = 0;
  
        await user1.save();
        return res.send("payment successful");
          },3000);
        }
        else{
          axios.get(`http://localhost:5002/refund/${user1.data.session_id}/${user1._id}`);
          res.send("No tickets available..You will be refunded soon");
        }
      }
      else{
        const flightId=user1.data.flightId;
        const flightId1=user1.data.flightId1;
        const day1=user1.data.details.date;
        const day2=user1.data.details.returndate;
        const date=await schedule.findOne({date:day1});
        const date1=await schedule.findOne({date:day2});
        const type=user1.data.details.class;
        const seats=user1.data.details.passengers;
        var isavailable=false;
        var isavailable1=false;
        
        const flights1=date.flights.filter((flight)=>{
          if(flight._id==flightId){
            if (flight.totalseats[type] - flight.seatsbooked[type] >= seats) {
              flight.seatsbooked[type] += seats;
              isavailable=true;
              
            } else {
              isavailable=false;
            }
          }
          return flight
        });
        const flights2=date1.flights.filter((flight)=>{
          if(flight._id==flightId1){
            if (flight.totalseats[type] - flight.seatsbooked[type] >= seats) {
              flight.seatsbooked[type] += seats;
              isavailable1=true;
              
            } else {
              isavailable1=false;
            }
          }
          return flight
        });
        console.log(flights1);
        if(isavailable&&isavailable1){
          await sendSuccessEmail(user1);
         // const date1 = await schedule.findOne({ date: day1 });
          setTimeout(async () => {
            date.flights=flights1;
            date1.flights=flights2;
            await date.save();
            await date1.save();
            user1.ffm = user1.ffm + user1.temp_ffm;
        user1.bookings.push(user1.data);
        
        user1.data = null;
        user1.pl = null;
        user1.sl = null;
        user1.flight_cost = 0;
  
        await user1.save();
        return res.send("payment successful");
          },3000);
        }
        else{
          axios.get(`http://localhost:5002/refund/${user1.data.session_id}/${user1._id}`);
          res.send("No tickets available..You will be refunded soon");
        }
      }
 
});

app.get("/ffm/:id", async (req, res, next) => {
  const user1 = await user.findById(req.params.id);
  if (!user1) {
    return res.send("oops something went wrong");
  }
  res.send({ ffm: user1.ffm });
});

app.get("/cancel/:id", async (req, res, next) => {
  const user1 = await user.findOne({ pl: req.params.id });
  if (!user1) {
    res.send("oops look likes the payment was already cancelled/ invalid link");
  }
  user1.data = null;
  user1.pl = null;
  user1.sl = null;
  user1.flight_cost = 0;
  user1.temp_ffm = 0;
  user.ffm = user1.prev_ffm;
  user1.prev_ffm = 0;
  await user1.save();
  res.send("payment cancelled");
});

app.get("/pl/:id", async (req, res, next) => {
  const user1 = await user.findById(req.params.id);
  if (!user1) {
    return res.send("oops something went wrong");
  }
  res.send({ pl: user1.pl });
});

app.get("/forgotpassword/:email", async (req, res, next) => {
  const user1 = await user.findOne({ email: req.params.email });
  if (!user1) {
    return res.send("not registered");
  }
  const token = crypto.randomBytes(64).toString("hex");
  user1.emailToken = token;
  forgotpassword(user1);
  await user1.save();
  res.send("email sent");
});

app.get("/forgotpassword/:email/:token", async (req, res, next) => {
  const user1 = await user.findOne({ emailToken: req.params.token });
  console.log(user1)
  console.log("hello")
  if (!user1) {
    res.send("f");
  }
  res.send("p");
});
app.post("/forgotpassword/:token", async (req, res, next) => {
  const saltHash = genpassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const user1 = await user.findOne({ emailToken: req.params.token });
  if (!user1) {
    res.send("oops something went wrong");
  }
  user1.salt = salt;
  user1.hash = hash;
  user1.emailToken = null;
  await user1.save();
  res.send("password changed");
});

app.get("/refund/:id/:email", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    const pi = session.payment_intent;
    console.log(pi);

    const refund = await stripe.refunds.create({
      payment_intent: pi,
    });
    console.log(refund);
    res.send("refund successful");
  } catch (error) {
    console.log(error);
    res.send("oops something went wrong");
  }
  const user1 = await user.findById(req.params.email);
  if (!user1) {
    return res.send("oops something went wrong");
  }
  const bookings = user1.bookings;
  var seats;
  var type;
  var date;
  var flightId;
  var returndate;
  var flightId1;
  var option
  var duration
  var fare
  var discount
  const newbookings = bookings.filter((booking) => {
    if(booking.session_id==req.params.id){
      if(booking.details.option=="one-way"){
        seats=booking.details.passengers;
        type=booking.details.class;
        date=booking.details.date;
        flightId=booking.flightId;
        option="one-way"
        duration=booking.duration
        fare=booking.fare
        discount=booking.discount
        console.log(seats,type,date,flightId)
      }
      else{
        seats=booking.details.passengers;
        type=booking.details.class;
        date=booking.details.date;
        flightId=booking.flightId;
         returndate=booking.details.returndate;
         flightId1=booking.flightId1;
         option="roundtrip"
         duration=booking.duration
         console.log("hellowww")
         fare=booking.fare
          discount=booking.discount
        
      }
    }
    return booking.session_id !== req.params.id;
  });
  user1.bookings = newbookings;
  user1.ffm=user1.ffm- Math.round(
    100 * duration * (seats)
  );
  await user1.save();
  console.log("masteer",fare,discount)
  refundmail(user1,fare,discount)
  if(option=="one-way"){
  const dateschedule=await schedule.findOne({date:date});
 
     const flights1=dateschedule.flights.filter((flight)=>{
    if(flight._id==flightId){
      flight.seatsbooked[type]-=seats;
    }
    return flight
  }); 
  
  dateschedule.flights=flights1;
  await dateschedule.save();
}
else{
  const dateschedule=await schedule.findOne({date:date})
  console.log(dateschedule)
  const dateschedule1=await schedule.findOne({date:returndate})
  const flights1=dateschedule.flights.filter((flight)=>{
    if(flight._id==flightId){
      flight.seatsbooked[type]-=seats;
    }
    return flight
  }); 
  const flights2=dateschedule1.flights.filter((flight)=>{
    if(flight._id==flightId1){
      flight.seatsbooked[type]-=seats;
    }
    return flight
  })
  dateschedule.flights=flights1;
  dateschedule1.flights=flights2;
  await dateschedule.save();
  await dateschedule1.save();
  
}
});
app.get("/bookings/:id", async (req, res, next) => {
  const user1 = await user.findById(req.params.id);
  if (!user1) {
    return res.send("oops something went wrong");
  }
  let bookingsbydate = {};
  user1.bookings.forEach((booking) => {
    booking.display = "none";
    if (bookingsbydate[booking.details.date]) {
      bookingsbydate[booking.details.date].push(booking);
    } else {
      bookingsbydate[booking.details.date] = [booking];
    }
  });
  console.log(bookingsbydate);
  res.send({ bookings: bookingsbydate });
});
