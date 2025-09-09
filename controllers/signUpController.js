const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function signUpForm(req, res) {
  const { message } = req.query;
  res.render("index", { message: message });
}

async function signUp(req, res) {
  const { username } = req.body;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.findUnique({ where: { name: username } });

  if (user) {
    res.redirect("/?message=User already exists");
  } else {
    await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
      },
    });
    console.log("user created!");
    res.redirect("/");
  }
}

module.exports = {
    signUpForm,
    signUp
}