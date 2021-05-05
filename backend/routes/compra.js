let express = require("express");
let Compra = require("../controllers/compra");

var api = express.Router();

api.post("/compra/realizarCompra", Compra.realizarCompra);
api.get("/compra/:id", Compra.datosCompra);
api.get("/compra/", Compra.listaCompra);
api.get("/compra/detalles/:id", Compra.compraDetalles);

module.exports = api;
