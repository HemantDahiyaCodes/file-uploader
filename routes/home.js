const express = require("express");
const homeRoute = express();
const homeController = require("../controllers/homeController").default;

homeRoute.get("/", homeController.homepage);

module.exports = homeRoute;
