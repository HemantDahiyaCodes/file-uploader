const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

passport.use(
  new localStrategy(function verify(username, password, cb) {
    const user = prisma.user.findUnique({
      where: { name: username, password: password },
    });

    if (err) {
      return cb(err);
    }

    if (!user) {
      return cb(null, false, { message: "Username or password is incorrect!" });
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = {
  passport,
};
