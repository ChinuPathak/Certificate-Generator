const express = require('express');
const { route } = require('./homeRoute');

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('login');
});

router.post('/', (req, res)=>{
    const user = req.body.user;
    res.render('dashboard', {user});
});

router.get('/dashboard', (req, res)=>{
    const user = req.body.user;
    res.render('dashboard', {user});
})

module.exports = router;