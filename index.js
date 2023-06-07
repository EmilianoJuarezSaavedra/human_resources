//dependencias
const morgan = require('morgan');
const express = require('express');
const app = express();
//routes
const employess = require("./routes/employess");
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const welcome = require('./middleware/welcome');
const cors = require('./middleware/cors');

//app.use();
app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", welcome);

app.use("/user", user);
app.use(auth);
app.use("/employess", employess);
app.use(notFound);


app.use("/employess", employess);

app.listen(process.env.PORT || 3000, () => {
    console.log("The server is running...");
});

