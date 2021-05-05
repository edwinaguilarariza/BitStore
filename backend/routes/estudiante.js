let express = require("express");
let Estudiante = require("../controllers/estudiante");

let api = express.Router();

api.post("/estudiante/registrarEstudiante", Estudiante.registrarEstudiante);
api.get("/estudiante", Estudiante.listarEstudiante);
api.get("/estudiante/:id", Estudiante.obtenerEstudiante);
api.put("/estudiante/editarEstudiante/:id", Estudiante.editarEstudiante);
api.delete("/estudiante/eliminarEstudiante/:id", Estudiante.eliminarEstudiante);

module.exports = api;
