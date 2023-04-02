const user =require('../../database/schemas/user.js')

const verifyEmail=(req, res, next) => {
    user
      .findOne({ emailToken: req.params.id })
      .then((user) => {
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
      })
  
  
  
  }