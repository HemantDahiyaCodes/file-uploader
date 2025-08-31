// Getting the path
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const dotenv = require("dotenv").config;

// Routes locations
const signUp = require("./routes/index");
const loginRoute = require("./routes/login");
const homeRoute = require("./routes/home");

// Instantiate the express
const app = express();

// Setting ejs as views and serving static files
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}))

// Creating the session
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, //ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdFunction: true,
      dbRecordIdFunction: undefined,
    }),
  })
);


// Routes
app.use("/", signUp);
app.use("/log-in", loginRoute)
app.use("/home", homeRoute);

// Server
app.listen(process.env.PORT || 8000, () => {
    console.log("Started server at port: ", process.env.PORT);
});