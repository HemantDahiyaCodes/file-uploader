const express = require("express");
const uploadRoute = express.Router();
const uploadController = require("../controllers/uploadController");

uploadRoute.get("/", uploadController.uploadForm);
uploadRoute.post(
  "/",
  uploadController.upload.single("filename"),
  uploadController.saveFileToDbAndCloud
);

module.exports = uploadRoute;
