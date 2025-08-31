const express = require("express");
const loginRoute = express();
const loginController = require("../controllers/signUpAndLoginCtrl");
const passport = require("../passport/passportAuthentication");

loginRoute.get("/", loginController.loginForm);
loginRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/log-in",
  })
);

module.exports = loginRoute;
