//variable donde importamos el jwt
let jwt = require("jwt-simple"); //encripta o desencripta o crea token
//importamos libreria para fechas
let moment = require("moment");//
//clave secreta por parte de el equipo de desarrollo
let secret = "bit3215store";

exports.createToken = function (usuario) {//esto es para activar la encriptacion en el token
    let payload = {//es una carga util importante es proteger la informacion que lleva aqui
        _id: usuario._id, 
        nombres: usuario.mombres,
        apellidos: usuario.apellidos,
        edad: usuario.edad,
        correo: usuario.correo,
        iat:moment().unix(),//esto nos trae la fecha hora exacta .mejor unix 
        //exp: moment.add(30, "days").unix(),//esto por el momento no hacerlo
    } 
    return jwt.encode(payload, secret); 
}












 













