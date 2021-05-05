//importamos el expres
let express = require("express");
//importamos el controlador
let Curso = require("../controllers/curso");

//importamos la libreria para la carga de archivos multiparty
let multiparty = require("connect-multiparty");


//importat modulo path por medio de multiparty
let path = multiparty({cargas : "./uploads/imgcurso" });

//generamos la ruta api
let api = express.Router();

//genermos las rutas de la api
api.post("/curso/registrarCurso", path, Curso.registrarCurso);
api.get("/curso/:nombre?", Curso.listarCurso);
api.get("/curso/obtenerCurso/:id", Curso.obtenerCurso);
api.put("/curso/editarCurso/:id", path, Curso.editarCurso);
api.delete("/curso/:id", Curso.eliminarCurso);


//exportamos el modulo
module.exports = api;
