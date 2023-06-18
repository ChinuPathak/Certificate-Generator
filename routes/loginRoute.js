const express = require("express");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { verifySign, signIn } = require("../controllers/loginCheck");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", signIn, async (req, res) => {
  const user = req.body.user;
  const admin = await Admin.findOne({ name: user.name });
  if (await bcrypt.compare(user.password, admin.password))
    res.render("dashboard", { user });
  else res.redirect("/login");
});

router.get("/dashboard", verifySign, (req, res) => {
  const user = req.body.user;
  res.render("dashboard", { user });
});

module.exports = router;
