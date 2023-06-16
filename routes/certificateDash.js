const express = require("express");
const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");

const router = express.Router();
let data;

async function generatePDF(url, outputPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });
  await page.pdf({ path: outputPath, format: "A4" });

  await browser.close();
}

router.post("/", (req, res) => {
  data = req.body.event;
  res.setHeader("Content-Type", "text/html");
  res.status(200).render("certificateDash");
});

router.get("/show", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "certificateserver25@gmail.com",
      pass: "SERVER#3167",
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: "devansh.gupta985@gmail.com",
    subject: "Certificate Generated",
    text: "Sending this email to notify you about the successful Creation of Your Certificate \nDo not respond to this Email It is auto generated from the Server",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.render("certificate", { data });
  res.status(303).redirect("/certificate");
});

router.get("/download", (req, res) => {
  generatePDF("http://localhost:5000/certificate/show", "../certificate.pdf")
    .then(() => console.log("PDF generated successfully"))
    .catch((err) => console.error(err));
  res.redirect("/login/dashboard");
});

module.exports = router;
