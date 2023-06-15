require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// const db = mongoose.connection;
// db.on('error', (err) => console.log(err));
// db.once('open', () => console.log('Database Connected'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
const bodyParseUser = (bodyParse.urlencoded({ extended: true }));

// Routes
const homeRouter = require('./routes/homeRoute');
const loginRouter = require('./routes/loginRoute');
const certificateRouter = require('./routes/certificateDash');

app.use('/', homeRouter);
app.use('/login', bodyParseUser, loginRouter);
app.use('/certificate', bodyParseUser, certificateRouter);
app.get('*', (req, res) => {
    res.status(404).render('errorPage', { status: 404, url: req.url });
});
// app.use(function (err, req, res, next) {
//     res.render('500', {
//         status: err.status || 500
//         , error: err
//     });
// });

app.listen(process.env.PORT, console.log(`Server Started at ${process.env.PORT}`));