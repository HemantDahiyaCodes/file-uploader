const express = require("express");
const folderRoute = express.Router();
const folderController = require("../controllers/folderController");


folderRoute.get("/", folderController.createFolderForm);
folderRoute.post("/", folderController.handleCreation);


module.exports = folderRoute;