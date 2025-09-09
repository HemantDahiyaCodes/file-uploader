const express = require("express");
const homeRoute = express.Router();
const homeController = require("../controllers/homeController");

homeRoute.get("/", homeController.homepage);
homeRoute.get("/:foldername", homeController.viewFolderContent);

module.exports = homeRoute;