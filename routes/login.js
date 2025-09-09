const express = require("express");
const loginRoute = express.Router();
const loginController = require("../controllers/loginController");
const passport = require("../passport/passportAuthentication");

loginRoute.get("/", loginController.loginForm);

loginRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login?message=incorrect+username+or+password",
  })
);

module.exports = loginRoute;