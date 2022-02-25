const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { User } = require('./sequelize');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
    console.log(req.cookies);
    next();
});

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, './index.html'));
});

app.post('/api/login', async function(req, res) {
    const {username, password} = req.body;

    const user = await User.findOne({
        where: {
            username,
            password
        },
        raw: true
    });
    console.log(user);

    res.cookie('loginToken', user.userId, {
        maxAge: 1000 * 60 * 15,
        httpOnly: true
    });

    res.json({
        data: "haha"
    });
});

app.listen(8080, function () {
    console.log('started!');
});