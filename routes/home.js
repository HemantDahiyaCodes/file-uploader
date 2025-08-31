const express = require("express");
const homeRoute = express.Router();

homeRoute.get("/", (req, res) => {
    const user = req.user;
    console.log("The username at home.js is: ", user);
    res.render("home", {user: user});
});

module.exports = homeRoute;