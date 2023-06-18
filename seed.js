const mongoose = require("mongoose");
const Admin = require("./models/admin");
const brcypt = require("bcrypt");

mongoose.connect("mongodb://127.0.0.1:27017/certificateGenerate");

async function saveSeed() {
  const hashedpass = await brcypt.hash("Dev", 10);
  console.log(hashedpass);
  const admin = new Admin({ name: "Devansh", password: hashedpass });
  await admin.save();
  console.log(admin);
}

saveSeed();
