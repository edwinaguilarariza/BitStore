let Estudiante = require("../modelo/estudiante");

const registrarEstudiante = (req, res) => {
  let params = req.body;
  let estudiante = new Estudiante();
  estudiante.nombres = params.nombres;
  estudiante.codigo = params.codigo;
  estudiante.correo = params.correo;
  estudiante.puntos = params.puntos;

  estudiante.save((err, datosEstudiante) => {
    if (datosEstudiante) {
      res.status(200).send({ cliente: datosEstudiante });
    } else {
      res.status(500).send(err);
    }
  });
};

const listarEstudiante = (req, res) => {
  Estudiante.find((err, datosEstudiante) => {
    if (datosEstudiante) {
      res.status(200).send({ estudiante: datosEstudiante });
    } else {
      res.status(403).send({ message: "No hay estudiantes en la bd" });
    }
  });
};

const obtenerEstudiante = (req, res) => {
  let id = req.params["id"];

  Estudiante.findById(id, (err, datosEstudiante) => {
    if (datosEstudiante) {
      res.status(200).send({ estudiante: datosEstudiante });
    }
  });
};

const editarEstudiante = (req, res) => {
  let id = req.params["id"];
  let params = req.body;

  Estudiante.findOneAndUpdate(
    id,
    {
      nombres: params.nombres,
      codigo: params.codigo,
      correo: params.correo,
      puntos: params.puntos,
    },
    (err, datosEstudiante) => {
      if (datosEstudiante) {
        res.status(200).send({ cliente: datosEstudiante });
      } else {
        res.status(500).send(err);
      }
    }
  );
};

const eliminarEstudiante = (req, res) => {
  let id = req.params["id"];

  Estudiante.findByIdAndRemove(id, (err, datosEstudiante) => {
    if (datosEstudiante) {
      res.status(200).send({ cliente: datosEstudiante });
    } else {
      res.status(500).send(err);
    }
  });
};

module.exports = {
  registrarEstudiante,
  editarEstudiante,
  listarEstudiante,
  obtenerEstudiante,
  eliminarEstudiante,
};
