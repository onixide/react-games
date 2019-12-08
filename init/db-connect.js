const mongoose = require("mongoose");
const config = require("config")

module.exports = function () {
    console.log("dbbbbb")
    console.log(config.get("db.url"))

    mongoose
        .connect(config.get("db.url"), { useNewUrlParser: true })
        .then(() => console.log("Połączono z bazą danych."))
        .catch(err => {
            console.log(err.errmsg);
            throw new Error(err);
        });
};
