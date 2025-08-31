const express = require("express");
const homeRoute = express.Router();

homeRoute.get("/", (req, res) => {
    const user = req.user;

    if(!req.user) {
        return res.redirect("/login?message=You must be logged in");
    }

    console.log("The username at home.js is: ", user.name);
    res.render("home", {user: user});
});

module.exports = homeRoute;