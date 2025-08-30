const passport = require("passport");
const localStrategy = require("passport-local");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

passport.use(
  new localStrategy(async function verify(username, password, done) {
    const user = prisma.user.findUnique({
      where: {
        name: username,
        password: password,
      },
    });

    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, {
        message: "Username or password is incorrect",
      });
    }
  })
);

module.exports = passport.authenticate;
console.log(passport.authenticate());
