const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const data = req.body.event;
    res.render('certificate', {data});
});

module.exports = router;