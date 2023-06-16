const jwt = require("jsonwebtoken");

module.exports.signIn = (req, res, next) => {
  const { name, password } = req.body.user;
  let token = jwt.sign({ password }, process.env.SECRET_TOKEN, {
    expiresIn: 60 * 60,
  });
  req.token = "bearer " + token;
  next();
};

module.exports.verifySign = (req, res, next) => {
  next();
  //   if (jwt.verify(req.token, process.env.SECRET_TOKEN)) next();
  //   else res.redirect("/login");
};
