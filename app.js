const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const { mongoose } = require('./config/mongoose');
const config = require('./config/config');
var cors = require('cors');


const user = require('./routes/user.js');
const task = require('./routes/task.js');
var app = express();

//Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));

const corsOptions = {
    origin: ["http://localhost:4200"],
    credentials: true,
    methods: "POST, PUT, OPTIONS, DELETE, GET",
    allowedHeaders: "Content-Type, Authorization, Content-Length, X-Requested-With"
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions));

app.use('/user', user);
app.use('/task', passport.authenticate('jwt', { session: false }), task);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        success: false,
        errorMsg: err.message || 'Something went wrong. Kindly reload the page'
    });
});

// To render front end
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'angular-app/dist/index.html'));
});

module.exports = app;