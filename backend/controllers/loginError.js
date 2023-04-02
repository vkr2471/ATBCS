const loginError=(req, res, next) => {
    res.status(400);
    res.send("Invalid Username or Password");
  }
    module.exports={loginError,};