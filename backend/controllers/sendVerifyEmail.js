const sendVerifyEmail=(req, res, next) => {
    const form = "<h1>Verify Email your email</h1>";
    res.send(form);
  }
  module.exports={sendVerifyEmail,};