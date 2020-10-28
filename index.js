require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const configPassport = require('./passport.config');
const routes = require('./routes');
require('./db');

configPassport(passport);

const app = express();
app.use(
    session({
        secret: 'monkey bananas'
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', hbs({ extname: 'hbs', runtimeOptions: {allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true}}));
app.set('view engine', 'hbs');

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log("Student Grade Tracker now running on" + process.env.PORT);
}) 