const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/signin", async (req, res, next) => {
    const {user_name, user_email, user_password} = req.body
    if(user_name && user_email && user_password){
        
        let query = "INSERT INTO user (user_name, user_email, user_password) ";
        query += `VALUES ('${user_name}', '${user_email}', '${user_password}');`;
        
        const rows = await db.query(query);

        return (rows.affectedRows == 1) ? res.status(201).json({ code:201 , message:"Usuario registrado correctamente" }) : res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});


user.post("/login", async (req, res, next) => {
    //No importa el orden, solo va a corroborar los datos con el body en la base de datos
    const {user_email, user_password} = req.body;
    const query = `SELECT * FROM user WHERE user_email = '${user_email}' AND user_password = '${user_password}';`;
    //rows es un arreglo  de una sola posicion, por eso en el if de abajo lo comparamos con 1
    const rows = await db.query(query);

    if(user_email && user_password) {
        if(rows.length == 1){ 
            //jwt.sing recibe un json de los datos de abajo y con eso va a generar el token
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_email: rows[0].user_email
            }, "debugkey", );
            return res.status(200).json({code: 200, message: token}) 
        } 
        else {
            return res.status(200).json({code: 401, message: "Usarios y/o contraseña incorrectos"});
        }
    }
    return res.status(200).json({ code:500, message: "Campos incompletos" });
});

user.get("/", async (req, res, next) => {

    const query = "SELECT * FROM user";

    const rows = await db.query(query);

    return res.status(500).json({ code: 500, message: rows});
});

module.exports = user;