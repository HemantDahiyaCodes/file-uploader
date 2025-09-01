const express = require("express");
const homeRoute = express.Router();
const uploadController = require("../controllers/uploadController");

homeRoute.get("/", (req, res) => {
    const user = req.user;

    if(!req.user) {
        return res.redirect("/login?message=You must be logged in");
    }

    console.log("The username at home.js is: ", user.name);
    res.render("home", {user: user});
});

homeRoute.post("/", uploadController.upload.single("fileUpload"), (req, res) => {
    console.log("The file info is: ", req.file);
    uploadController.saveFileToDb(req, res);

    res.redirect("/home");
})

module.exports = homeRoute;