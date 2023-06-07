const express = require('express');
const employess = express.Router();
const db = require('../conexion_database/database');

employess.post("/", async (req, res, next) => {

    const { user_name, last_name, phone_number,user_email, user_address } = req.body;
    
    if (user_name && last_name && phone_number && user_email && user_address) {
        let query = "INSERT INTO employess(user_name, last_name, phone_number, user_email, user_address)";
        query += ` VALUES('${user_name}', ${last_name}, ${phone_number}, ${user_email}, ${user_address} )`;
    
        const rows = await db.query(query);

        //ternario como if Nota IMPORTANTE
        (rows.affectedRows == 1) ? res.status(201).json({code: 201, message: "Trabajador insertado correctamente" }) : res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

employess.delete("/:id([0-9]{1,5})", async (req, res, next) => { 

    const query = `DELETE FROM employess WHERE user_id=${req.params.user_id}`;

    const rows = await db.query(query);

    return (rows.affectedRows == 1) ? res.status(201).json({code: 201, message: "Trabajador Borrado Correctamente" }) : res.status(404).json({code: 404, message: "Trabajador no encontrado"});
});

employess.put("/:id([0-9]{1,5})", async (req, res, next) => {

    const { user_name, last_name, phone_number, user_email, user_address} = req.body;

    if (user_name && last_name && phone_number && user_email && user_address) {
        let query = `UPDATE pokemon SET user_name='${user_name}', last_name=${last_name},`; 
        query += ` phone_number=${phone_number}, user_email=${user_email}, user_address=${user_address} WHERE user_id=${req.params.user_id};`;
        
        console.log(query);
        const rows = await db.query(query);

        //ternario como if Nota IMPORTANTE
        return (rows.affectedRows == 1) ? res.status(201).json({code: 201, message: "Pokemon Actualizado correctamente" }) : res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

employess.patch("/:id([0-9]{1,5})", async (req, res, next) => {
    if(req.body.user_name){
        
        let query = `UPDATE employess SET user_name='${req.body.user_name}' WHERE user_id=${req.params.user_id}`; 
        const rows = await db.query(query);

        //ternario como if Nota IMPORTANTE
        return (rows.affectedRows == 1) ? res.status(201).json({code: 201, message: "Trabajador Actualizado correctamente" }) : res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:  "Campos incompletos"});    
});

employess.get('/:id([0-9]{1,5})', async (req, res, next) => {
    const id = req.params.user_id;

    if(id >= 1 && id <= 722) {
        const peticion = await db.query("SELECT * FROM employess WHERE user_id= " + id + ";");
        console.log(peticion);
        return res.status(201).json({ code: 201, message: peticion });
        
    }
    return res.status(404).json({ code: 404, message: "El Trabajador No se ha encontrado por el id: " + id });
});

employess.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.user_name;
    
    const peticion = await db.query("SELECT * FROM employess WHERE user_name= '" + name + "';");
     //operador ternario es igual a un if
     return (peticion.length > 0) ? res.status(201).json({code: 201, message: peticion}) : res.status(404).json({code: 404, message: "Trabajador NO encontrado por el nombre: " + name});  
});  

module.exports = employess;