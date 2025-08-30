const express = require("express");
const indexRoute =express();


indexRoute.get("/", (req, res) => {
    res.render("index");
})