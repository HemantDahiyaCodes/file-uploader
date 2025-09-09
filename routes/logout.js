const express = require("express");
const logoutRoute = express.Router();

logoutRoute.get("/", (req, res) => {
    req.logout(function(err) {
        if (err) return err;
    });

    res.redirect("/");
})

module.exports = logoutRoute;