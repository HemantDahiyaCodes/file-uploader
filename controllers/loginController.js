function loginForm(req, res) {
  const { message } = req.query;
  res.render("login", { message: message });
}

module.exports = { loginForm };
