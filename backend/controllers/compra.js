let Compra = require("../modelo/compra");
let DetalleCompra = require("../modelo/detalleCompra");
let Curso = require("../modelo/curso");

const realizarCompra = (req, res) => {
  let params = req.body;
  let compra = new Compra();
  compra.idEstudiante = params.idEstudiante;
  compra.idUsuario = params.idUsuario;

  compra.save((err, datosCompra) => {
    if (datosCompra) {
      let detalles = params.detalles;

      detalles.forEach((cpra) => {
        let detalleCompra = new DetalleCompra();
        detalleCompra.idCurso = cpra.idCurso;
        detalleCompra.cantidad = cpra.cantidad;
        detalleCompra.idCompra = datosCompra._id;

        detalleCompra.save((err, datosDetalle) => {
          if (datosDetalle) {
            Curso.findById({ _id: cpra.idCurso }, (err, datosCurso) => {
              if (datosCurso) {
                Curso.findByIdAndUpdate(
                  { _id: datosCurso._id },
                  {
                    cupos: parseInt(datosCurso.cupos) - parseInt(cpra.cantidad),
                  },
                  (err, datosCurso) => {
                  /*    if (datosCurso) {
                        res.status(200).send({  mensaje: "la compra se realizo con exito" });
                      } else {
                        res.status(401).send({ mensaje: "No se pudo registrar la compra" });
                      }*/
                   
                  res.end();//esto es por error en la terminal
                    });
              } else {
                res.send(err);
              }
            });
          } else {
            res.send(err);
          }
        });
      });
    } else {
      res.send(err);
    }
  });
};

const datosCompra = (req, res) => {
  let id = req.params["id"];

  Compra.findById(id)
    .populate("idEstudiante")
    .populate("idUsuario")
    .exec((err, datosCompra) => {
      if (datosCompra) {
        DetalleCompra.find({ compra: datosCompra._id })
          .populate("idCurso")
          .exec({ idcompra: id }, (err, datosDetalle) => {
            if (datosDetalle) {
              res.status(200).send({
                data: {
                  compra: datosCompra,
                  detalle: datosDetalle,
                },
              });
            }
          });
      }
    });
};

const listaCompra = (req, res) => {
  Compra.find()
    .populate("idEstudiante")
    .populate("idUsuario")
    .exec((err, datosCompra) => {
      if (datosCompra) {
        res.status(200).send({ compra: datosCompra });
      } else {
        res.status(404).send({ message: "No hay ningun registro de compra" });
      }
    });
};

const compraDetalles = (req, res) => {
  let id = req.params["id"];

  DetalleCompra.find({ _id: id })
    .populate("idCurso")
    .exec((err, datosDetalles) => {
      if (datosDetalles) {
        res.status(200).send({ detalles: datosDetalles });
      } else {
        res.status(404).send({ message: "No hay ningun registro de compras" });
      }
    });
};

module.exports = {
  realizarCompra,
  datosCompra,
  listaCompra,
  compraDetalles,
};
