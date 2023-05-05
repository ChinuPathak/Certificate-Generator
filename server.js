require('dotenv').config();
const express = require('express');
const bodyParse = require('body-parser');

const app = express();

app.set('view engine','ejs');
app.set('views', './views');
app.use(express.static('public'));
const bodyParseUser = (bodyParse.urlencoded({extended: false}));

// Routes
const homeRouter = require('./routes/homeRoute');
const loginRouter = require('./routes/loginRoute');

app.use('/', homeRouter);
app.use('/login', bodyParseUser,loginRouter);

app.listen(process.env.PORT, console.log(`Server Started at ${process.env.PORT}`));