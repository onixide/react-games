const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require('passport');

require("./init/error-handling")();
require("./init/db-connect")();
require('./init/passport')(passport);

app.use(helmet());
app.use(morgan("tiny"));

require("./init/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}!`));
