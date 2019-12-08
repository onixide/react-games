const express = require('express');
const main = require("../routes/main")
const users = require("../routes/users")
const auth = require("../routes/auth")


module.exports = function (app) {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    app.use('/', main);
    app.use('/users', users);
    app.use('/auth', auth);

    require("../middleware/error-middleware")(app);

}
