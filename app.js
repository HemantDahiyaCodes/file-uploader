const express = require("express");
const path = require("node:path");
const expressSession = require("express-session");
const prismaSessionStore = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const passport = require("./passport/passportAuthentication");
// Routes
const indexRoute = require("./routes/indexRoute")

// Instantiating the express app
const app = express();
const PORT = 8000;

// Setting views folder and views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(passport.passport.authenticate("session"));

// Setting up express session and prisma-session-store
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, //ms
    },
    secret: "santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new prismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIsSessionId: true,
      dbRecordFunction: undefined,
    }),
  })
);

app.use("/", indexRoute)

app.listen(PORT, () => {
  console.log("Server started at: ", PORT);
});
