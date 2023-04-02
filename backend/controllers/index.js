const logout=(req, res, next) => {
    req.logout();
    res.redirect("/login");
    res.redirect("/");
  }
    module.exports={logout,};