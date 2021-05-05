
// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

// Se crea el esquema
let categoriaSchema = Schema({
  nombre: String,
  descripcion: String,
});
// Se exporta el modulo
const Categoria = mongoose.model("categoria", categoriaSchema);
module.exports = Categoria;