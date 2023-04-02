const register =async (req, res, next) => {
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
      pl:null,
      sl:null,
      ffm: 0,
      
    });
    console.log(newuser)
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
        console.log(error);
        console.log(Object.keys(error.keyPattern));
        if (Object.keys(error.keyPattern)[0] == "email") {
          res.status(400);
          res.send("Email already registered");
        } else if (Object.keys(error.keyPattern)[0] == "phone") {
          res.status(400);
          res.send("Phone number already registered");
        }
      });
  }
  module.exports={register,};