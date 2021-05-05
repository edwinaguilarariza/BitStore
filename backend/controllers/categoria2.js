//importamos el modelo categoria
let Categoria = require("../modelo/categoria"); // enrutamos para registrar en mongo

//registrsamos la categoria
const registrarCategoria =  (req, res) => {
  //obtenemos los datos del json
  let params = req.body;
  //creamos nueva instacia de categoria
  let categoria = new Categoria();
  //guardamos los datos del req en la coleccion
  categoria.nombre = params.nombre;
  categoria.descripcion = params.descripcion;
  //save guardamos la info en mongo db
  categoria.save((err, saveCategoria) => {
      //si llega un error desde el servidor de mongo
      if (err) {//porque solo es true
          res.status(500).send({mensaje: "error al conectar al servidor"});
      } else {
          if (saveCategoria) {
              res.status(200).send({categoria: saveCategoria});
          } else {
              res.status(401).send({mensaje: "no se puedo registrar la catergoria"})
          }
      }
  });
};

//buscar categorias con metodo get
const buscarCategoria = (req, res) => {
    //obtenemos el id de la categoria
    let id = req.params["id"];
    //buscamos la categoria por el id
    Categoria.findById({_id:id}, (err, datosCategoria) => {
        //si hay error al conectar momgo
        if (err) {
            res.status(500).send({mensaje: "error al conectar al servidor"});
        } else {
           if (datosCategoria) {
            res.status(200).send({categoria: datosCategoria});
           } else {
            res.status(401).send({mensaje: "la categoria no existe"});
           } 
        }
    });
};




//listar categorias con o sin filtro
const listaCategoria = (req, res) => {
    //si tenemos filtro nombre lo guardamos
    let nombre = req.params["nombre"];
      //let params = req.body;

    //busqueda de las categorias
    Categoria.find({nombre : new RegExp(nombre, "i")},(err, datosCategoria) => {
        //si hay error al conectar momgo
        if (err) {
            res.status(500).send({mensaje: "error al conectar al servidor"});
        } else {
           if (datosCategoria) {
            res.status(200).send({categoria: datosCategoria});
           } else {
            res.status(401).send({mensaje: "No hay categorias"});
           } 
        }
    });
};

//editar categoria
const editarCategoria = (req, res) => {
    //obtenemos el id de la categoria
    let id = req.params["id"];
    //obrtenemos los datos que llegan de la api
    let params = req.body;
    //buscar la categoria por id y editarla 
    Categoria.findByIdAndUpdate({ _id: id }, {nombre: params.nombre, descripcion: params.descripcion}, (err, datosCategoria) => {
        if (err) {
            res.status(500).send({mensaje: "error al conectar al servidor"});
        } else {
           if (datosCategoria) {
            res.status(200).send({categoria: datosCategoria});
           } else {
            res.status(401).send({mensaje: "la categoria no se pudo editar"});
           } 
        }
    });
};

//eliminamos una categoria
const eliminarCategoria = (req, res) => {
    //obtener el id de la categoria
    let id = req.params["id"];
    //eliminamos la categoria por el id
    Categoria.findByIdAndDelete({ _id: id },  (err, datosCategoria) => {
        if (err) {
            res.status(500).send({mensaje: "error al conectar al servidor"});
        } else {
           if (datosCategoria) {
            res.status(200).send({categoria: datosCategoria});
           } else {
            res.status(401).send({mensaje: "la categoria no se pudo editar"});
           } 
        }
    });
};




module.exports = {
    registrarCategoria,
    buscarCategoria,
    listaCategoria,
    editarCategoria,
    eliminarCategoria,
}