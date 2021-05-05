//variable donde se importa el modulo usuario
let Usuario = require("../modelo/usuario");// esto es para exportar la tura de usiario del a caprtepta modelo de el archivo usuario
//variable para importasr la libreria encriptar pass
let bcrypt = require("bcrypt-nodejs"); //es para encriptar la contraseña .es un controlador nos permite resgistrar un usuario para le lo mande al modelo

let jwt = require("../libs/jwt");//traemos el jwt de libs 


// Funcion para registrar el usuario
const registrarUsuario = (req, res) => {
  // sacamos los parametros del cuerpo de la API (ruta url)
  let params = req.body;
  // utilizamos el modelo usuario
  let usuario = new Usuario();
  // Si llego el password procedemos hacer el hash (encriptar)
  if (
    params.nombres &&
    params.apellidos &&
    params.edad &&
    params.correo &&
    params.pass &&
    params.rols
  ) {
    // Usamos el bcrypt para encriptar la contraseña
    bcrypt.hash(params.pass, null, null, (err, hash) => {
      // si se encripta registramos el usuario
      if (hash) {
        usuario.nombres = params.nombres;
        usuario.apellidos = params.apellidos;
        usuario.edad = params.edad;
        usuario.correo = params.correo;
        usuario.pass = hash;
        usuario.rol = params.rol;
        // Registramos los datos del usuario (los guardamos para enviarlos a mongo por el modelo)
        usuario.save((err, saveUsuario) => {
          if (err) {
            // si hay un error en el registro
            res.status(500).send({ err: "No se registro el usuario" });
          } else {
            // si el proceso se completo bien procedemos a guardar en el modelo los datos
            res.status(200).send({ usuario: saveUsuario });
          }
        });
      }
    });
  } else {
    // Damos respuesta con codigo HTTP de error y enviamos el error a consola
    res.status(405).send({ err: "Faltaron campos por llenar" });
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
                        if (params.getToken) {//si llego el toquen  //jwt: jwt.createToken(datosUsuario) esto es despues de haber creado el token
                            res.status(200).send({jwt: jwt.createToken(datosUsuario),/* Usuario: datosUsuario */ });//nos muestra el json // Usuario: datosUsuario se comento para que encripte todo
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