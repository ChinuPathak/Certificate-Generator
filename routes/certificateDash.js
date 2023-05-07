const express = require('express');
const request = require('request');

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
router.post('/', (req, res) => {
    data = req.body.event;
    res.render('certificateDash');
});

router.get('/show',(req, res)=>{
    res.render('certificate',{data})
    res.redirect('/certificate');
});

module.exports = router;