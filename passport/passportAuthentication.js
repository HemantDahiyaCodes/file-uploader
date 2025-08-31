const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

passport.use(
  new localStrategy(async function verify(username, password, done) {
    const user = await prisma.user.findUnique({
      where: {
        name: username,
      },
    });

    if (!user) {
      return done(null, false, {
        message: "Username or password is incorrect",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("Matched password: ", match);
    if (!match) {
      return done(null, false, { message: "password is incorrect!" });
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    done(null, id);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;