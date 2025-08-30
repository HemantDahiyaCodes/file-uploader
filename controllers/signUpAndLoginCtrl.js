const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function signUpForm(req, res) {
  const {message} = req.query;
  console.log(message);
  res.render("index", {message});
}

async function signUp(req, res) {
  const { username } = req.body;
  const { password } = req.body;
  console.log("The username is: ", username);
  console.log("The password is: ", password);

  const user = await prisma.user.findUnique({ where: { name: username } });

  if (user) {
    res.redirect("/?message=User already exists");
  } else {
    await prisma.user.create({
      data: {
        name: username,
        password: password,
      },
    });
    console.log("user created!");
    res.redirect("/");
  }
}

module.exports = {
  signUpForm,
  signUp,
};
