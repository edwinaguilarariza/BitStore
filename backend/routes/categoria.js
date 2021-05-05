//importamos express
let express = require("express");
//importamos el controlador de categoria
let Categoria = require("../controllers/categoria");

//creamos la api para controlar las rutas
let api = express.Router();

//rutas de la api
api.post("/categoria/registrarCategoria", Categoria.registrarCategoria);
api.get("/categoria/:id", Categoria.buscarCategoria);
api.get("/categoria/:nombre?", Categoria.listaCategoria);
api.post("/categoria/:nombre?", Categoria.listaCategoria);
api.put("/categoria/editarCategoria/:id", Categoria.editarCategoria); 
api.delete("/categoria/eliminarCategoria/:id", Categoria.eliminarCategoria);


//exportamos el modulo
module.exports = api;
