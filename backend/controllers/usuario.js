//variable donde se importa el modulo usuario
let Usuario = require("../modelo/usuario");// esto es para exportar la tura de usiario del a caprtepta modelo de el archivo usuario
//variable para importasr la libreria encriptar pass
let bcrypt = require("bcrypt-nodejs"); //es para encriptar la contraseña .es un controlador nos permite resgistrar un usuario para le lo mande al modelo



//funcion que registra un usuario
const registrarUsuario = (req,res) => { //es una api que se va a consumir resquest es lo que trae y response es lo enenvia
    //sacamos los paramettros del body oesa lo que viene en la api 
    let params = req.body;
    //uitixamos el modelo usurario (pero limpio)
    let usuario = new Usuario();////es para limpiar los nuevos usuarios   osea que que el espacio vacio para guardad los nuevos usuarios
    //validamos el password para encriptar
    if (params.pass) {
        //usamos bcrypt pars encriptar el password
        bcrypt.hash(params.pass,null,null,function(err,hash){//para wencriptar meceita paramettroe osea datos o callback any ysalt no se pusa ypor eso null
            //si se encripta la contraseña  va allegar aca
            if (hash) {
                usuario.nombres = params.nombres;
                usuario.apellidos = params.apellidos;
                usuario.edad = params.edad;
                usuario.correo = params.correo;
                usuario.pass = hash;
                usuario.rol = params.rol;
                //enviamos al modelo para registrar en mongodb
                usuario.save((err,saveUsuario) => {
                    if (err) {
                        //sihay error
                        res.status(500).send({err:"No se registro el usuario"});
                    } else {
                        //si el proceso se completo osea que se guardo
                        res.status(200).send({usuario: saveUsuario});//usuario notiene nada que ver con una variable del docuemnto
                    }
                })
            } else {
                //damos respuesta al error de encriptacion  si lo hay
                res.status(400).send({err: "no se registro el pass, t no se registro"});
            }
        })
    } else {
        //validacion de los datos del json
    }

};

//login
const login = (req,res) => {// el login va en forma de metodo// reqerimiento y respuesta
    //varable para los parametros que llegan
    let params = req.body;
    //buscamos el usuario en bd 
    Usuario.findOne({correo: params.correo}, (err, datosUsuario) => {//para que busque el correo de la colleccion Usuario  y datosUsuario se puede nombrar de cualquier manera 
        if (err) {
            res.status(500).send({mensaje: "Error del servidor"}); //por si no encuentra el correo le enviamos un mensaje
        } else {
            if (datosUsuario) {// si encuentra el correo pues usamos la libreria de bcrypt  y el metodo .compare para que compare la contraseña de ingresa el usuario con la que esta almacenada en mongo
                bcrypt.compare(params.pass, datosUsuario.pass, function (err, confirm) {//nos confirma si el usdiario se logueo//esto es para que compare la contraseña encriptada en mongo si llego //datosUsuario.pass esto compara la contraseña  1234 y compararlo con la encriptada
                    if (confirm) {
                        if (params.getToken) {//si llego el toquen 
                            res.status(200).send({Usuario: datosUsuario});//nos muestra el json
                        } else {
                            res.status(200).send({Usuario:datosUsuario, mensaje:"Sin token"});//si llega el json y no hay token
                        }
                    } else {
                        res.status(401).send({mensaje:"Correo o password incorrecto"});//si el usuario ingresa mal los datos
                    }
                });
            } else {
                res.status(401).send({mensaje:"Correo o password incorrecto"});//si el usuario ingresa mal los datos
            }
        }
    });
};
                    


//exportamos el modulo
module.exports = {//vamos a enviar un jason  // no hay que invocarla 
    registrarUsuario,
    login,//exportar el login
};