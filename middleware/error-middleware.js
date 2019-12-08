module.exports = function (app) {
    app.use(function (err, req, res, next) {
        console.log(err);
        console.log(`Błąd serwera - ${err.message}`);
        res.status(500).send(`Błąd serwera - ${err.message}`);
    });
}