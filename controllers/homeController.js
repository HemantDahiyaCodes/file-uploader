async function homepage(req, res) {
  const user = req.user;
  console.log("The user is:", user);

  res.render("home", { user: user });
}

module.exports = { homepage };
