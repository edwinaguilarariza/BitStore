//importamos el modelo de curso
let Curso = require("../modelo/curso");
//importamos modulo de node para el control de ficheros imagenes documentosd de texto
let fs = require("fs");
//importar el modulo path es para conterolar las rutas de las imagenes
let path = require("path");
//importar la ruta de las fechas del sistemas 
let moment = require("moment");

//registrar curso
const registrarCurso = (req, res) => {
  //obtrenemos datos del json
  let params = req.body;
  //instanciamos el curso modelo
  let curso = new Curso();
  //registramos producto osea curso
  //validamos los campos antes de registrar
  if (
    params.nombre &&
    params.descripcion &&                  
    params.precioTotal &&
    params.precioCompra &&
    params.cupos &&
    params.idCategoria &&
    params.puntos
    
  ) {
    //creamos variable donde quedara imagen cargada  "c://Usuario/Descarga/js.jpg"
    let imagenPath = req.files.imagen.path;
     //borrar despues de borrar
    //generamos codigo consecutivo con fecha para el nombre de las imagenes
    let nameImg = moment().unix();
    
    //creamos variable  de la nueva ruta "//uploads/imgcurso/280421141532.jpg"fecha y hora automaticamente
    let rutaServer = "./uploads/imgcurso/" + nameImg + path.extname(imagenPath);
    
    //pegamos la imagen en la nueva ruta
    fs.createReadStream(imagenPath).pipe(fs.createWriteStream(rutaServer));
    // nombre del archivo que quedadra en bd
    let dbImg = nameImg + path.extname(imagenPath);

    //lleamos el modelo con lls datos del req
    curso.nombre = params.nombre;
    curso.descripcion = params.descripcion;
    curso.imagen = dbImg;
    curso.precioTotal = params.precioTotal;
    curso.precioCompra = params.precioCompra;
    curso.cupos = params.cupos;
    curso.idCategoria = params.idCategoria;
    curso.puntos = params.puntos;
    //registramos el curso
    curso.save((err, datosCurso) => {
      if (err) {
        //porque solo es true
        res.status(500).send({ mensaje: "error al conectar al servidor" });
      } else {
        if (datosCurso) {
          res.status(200).send({ curso: datosCurso });
        } else {
          res.status(401).send({ mensaje: "no se puedo registrar el curso" });
        }
      }
    });
  } else {
    res.status(401).send({ mensaje: "falto algunos de los datos" });
  }
};

//listar todos los cursos
const listarCurso = (req, res) => {
  let nombre = req.params["nombre"];
      

    //busqueda de las curso
    Curso.find({nombre : new RegExp(nombre, "i")}).populate("idCategoria").exec((err, datosCurso) => {
        //si hay error al conectar momgo
        if (err) {
            res.status(500).send({mensaje: "error al conectar al servidor"});
        } else {
           if (datosCurso) {
            res.status(200).send({curso: datosCurso});
           } else {
            res.status(401).send({mensaje: "No hay cursos"});
           } 
        }
    });
};


// Obtener Curso

const obtenerCurso = (req, res) => {
  console.log(req);
  let id = req.params["id"];

  Curso.findOne({ _id: id }, (err, datosCurso) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (datosCurso) {
        res.status(200).send({ curso: datosCurso });
      } else {
        res.status(403).send({ message: "No existe el curso" });
      }
    }
  });
};

// Editar curso

const editarCurso = (req, res) => {
  let params = req.body;
  let id = req.params["id"];
  let img = req.params["img"];

  if (
    params.nombre &&
    params.descripcion &&
    params.precioTotal &&
    params.precioCompra &&
    params.cupos &&
    params.idCategoria &&
    params.puntos
  ) {
    if (img || img != null || img != undefined) {
      fs.unlink("./uploads/imgcurso/" + img, (err) => {
        if (err) throw err;
      });
    }

    // Ruta donde quedara la imagen en el proyecto
    let imagenPath = req.files.imagen.path;
    // Generamos un codigo para las imagenes
    let nameImg = moment().unix();
    // creamos variable de la nueva ruta
    var rutaServer =
      "./uploads/imgcurso/" + nameImg + path.extname(imagenPath);
    // copiamos la imagen a la nueva ruta
    fs.createReadStream(imagenPath).pipe(fs.createWriteStream(rutaServer));
    // Nombre del archivo que quedara en BD
    let bdImg = nameImg + path.extname(imagenPath);
    console.log(params);
    console.log(id);
    console.log(img);
    console.log(bdImg);
    Curso.findByIdAndUpdate(
      { _id: id },
      {
        nombre: params.nombre,
        descripcion: params.descripcion,
        imagen: bdImg,
        precioTotal: params.precioTotal,
        precioCompra: params.precioCompra,
        cupos: params.cupos,
        idCategoria: params.idCategoria,
        puntos: params.puntos,
      },
      (err, datosCurso) => {
        console.log(datosCurso)
        if (err) {
          res.status(500).send({ message: "Error en el servidor" });
        } else {
          if (datosCurso) {
            res.status(200).send({ curso: datosCurso });
          } else {
            res.status(403).send({ message: "No se edito el curso" });
          }
        }
      }
    );
  } else {
    res.status(401).send({ mensaje: "Falto alguno de los campos" });
  }
};

// Eliminamos curso
const eliminarCurso = (req, res) => {
  let id = req.params["id"];

  Curso.findOneAndRemove({ _id: id }, (err, datosCurso) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (datosCurso) {
        fs.unlink("./uploads/imgcurso/" + datosCurso.imagen, (err) => {
          if (err) throw err;
        });
        res.status(200).send({ produto: datosCurso });
      } else {
        res.status(403).send({ message: "No se elimino ningun registro" });
      }
    }
  });
};



//exportamos el modulo con sus funsiones
module.exports = {
  registrarCurso,
  listarCurso,
  obtenerCurso,
  editarCurso,
  eliminarCurso,
};
