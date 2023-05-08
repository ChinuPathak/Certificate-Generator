const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/certificateGenerate')
.then(()=>{
    bcrypt.hash("Dev", 10, async function (err, hash) {
        if (err) return console.log(err);
        const admin = new Admin({ name: "Devansh Gupta", password: hash })
        await admin.save();
    });
});

// mongoose.connection.close();