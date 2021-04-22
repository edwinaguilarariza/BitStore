// importamos modulo mongoose
let mongoose = require("mongoose"); //administra mongosse
//crear esquema del usuario
let Schema = mongoose.Schema;

//modelamos el esquema

let usuarioSchema = Schema({ //esto es un json
    nombres: String,
    apellidos: String,
    edad: Number,
    correo: String,
    pass: String,
    rol: String,//cuando que remos sacar un id de otra coleccion es asi como una yave foranea
    fechaRegistro: {type: Date, default: Date.now}// esto muestr en la base de datos la fecha de registro  no lo munestra al usuario
});
//exportaqmos el modelo usuario 
module.exports = mongoose.model("usuario", usuarioSchema);

    
    
    
    
