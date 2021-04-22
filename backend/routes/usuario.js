//variable express
let express = require("express");
//importamos el controlador de usuario
let Usuario = require("../controllers/usuario");//esto es para importa de los controlleres el archivo que necesitamos
//creamos la api
let api = express.Router();//esto es lo que permite manejar y controlar todas las urls

//servicio POST que es para registrar solo registra
//se ejecuta sobre http//localhost:3001/api/registrarUsuario   vamos despues a index.js
api.post("/registrarUsuario", Usuario.registrarUsuario);//esta es la url de nuestra api 
//servicio para e login
api.post("/login", Usuario.login); //

module.exports = api;