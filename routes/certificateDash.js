const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();
let data;

/*
const options = {
  url: 'http://localhost;5000/certificate/show',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
      data
    },
    json: true
};
request(options, function(err, response, body) {
  if (err) {
    console.error(err);
  } else {
    const certificateUrl = body.certificateUrl; // assuming the response contains the URL of the generated certificate
    // redirect to the page where the certificate will be displayed using an iframe
    res.redirect('/certificate?certificateUrl=' + certificateUrl);
  }
});
*/

/*
const puppeteer = require('puppeteer');

async function generatePDF(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.pdf({path: outputPath, format: 'A4'});

  await browser.close();
}

generatePDF('https://www.example.com', 'example.pdf')
  .then(() => console.log('PDF generated successfully'))
  .catch(err => console.error(err));

  */
async function generatePDF(url, outputPath) {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.pdf({ path: outputPath, format: 'A4' });

  await browser.close();
};

router.post('/', (req, res) => {
  data = req.body.event;
  res.setHeader('Content-Type', 'text/html');
  res.status(200).render('certificateDash');
});

router.get('/show', (req, res) => {
  res.render('certificate', { data })
  res.status(303);
  res.redirect('/certificate');
});

router.get('/download', (req, res) => {
  generatePDF('http://localhost:5000/certificate/show', '../certificate.pdf')
    .then(() => console.log('PDF generated successfully'))
    .catch(err => console.error(err));
  res.redirect('/login/dashboard');
})

module.exports = router;