const express = require("express");
const indexRoute = express.Router();
const signUpController = require("../controllers/signUpController");

indexRoute.get("/", signUpController.signUpForm);
indexRoute.post("/sign-up", signUpController.signUp);


module.exports = indexRoute;