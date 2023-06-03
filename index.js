const express = require('express');

const app = express();

app.get("/", (req, res, next ) => {
    res.status(200).send("Bienvenido mi perro");
});

app.listen(3000, () => {
    console.log("The server is running...")
});