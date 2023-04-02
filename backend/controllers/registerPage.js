const registerPage=(req, res, next) => {
    const form =
      '<h1>Register Page</h1><form method="post" action="register">\
                      Enter Username:<br><input type="text" name="name">\
                      <br>Enter Password:<br><input type="password" name="password">\
                      <br>Enter Email:<br><input type="email" name="email">\
                      <br>Enter Phone:<br><input type="text" name="phoneNumber">\
                      <br>Enter Date of Birth:<br><input type="date" name="DOB">\
                      <br><br><input type="submit" value="Submit"></form>';
  
    res.send(form);
  }
    module.exports={registerPage,};