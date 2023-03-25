const loginpage =(req,res,next)=>{
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter email:<br><input type="text" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
}
module.exports={loginpage,};