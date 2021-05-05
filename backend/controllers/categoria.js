//importamos el modelo categoria
let Categoria = require("../modelo/categoria"); // enrutamos para registrar en mongo
let mongoose = require("mongoose");


//registrsamos la categoria
const registrarCategoria = async (req, res) => {
  //obtenemos los datos del json
  let params = req.body;
  //validamos que si esten los parametros obligatorios
  if (!params.nombre || !params.descripcion) {
      //si falta un dato o ambos respondemos en response
     return res.status(401).send({ ErrorDeFront:"falto un dato"});
  } else {
      //asignamos los parametros a nueva instancia del modelo
      let categoria = new Categoria({
          nombre: params.nombre,
          descripcion: params.descripcion,
      });
      //registrar categoria con un await
      const result = await categoria.save();
      //validamos el result el resul con ternario
      result ? res.status(200).send({categoria: result }) : res.status(401).send({ Error: "no se puedo registrar la categoria"});
  }
};

 
      
  

//buscar categorias con metodo get
const buscarCategoria = async (req, res) => {
    //validar momgodb para generar los id
    let idValido = mongoose.Types.ObjectId.isValid(req.params["id"]);
    if (!idValido) {
        return res.status(400).send({Error: " el ID no es un formato valido de mongo"});
    } else {
        let categoria = await Categoria.findById(req.params["id"]);
        categoria ? res.status(200).send({categoria: categoria}) : res.status(401).send({mensaje: "la categoria no existe"});
    }
};
    




//listar categorias con o sin filtro
const listaCategoria = async (req, res) => {
    
    let categoria = await Categoria.find({nombre : new RegExp(req.params ["nombre"], "i"),});
        if (!categoria || categoria.length == 0 ) {
            return res.status(400).send({Error: "No se encontro categoria"});
        } else {
            return res.status(200).send({categorias: categoria});
        }
    
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



const categoriaController = {
    registrarCategoria,
    buscarCategoria,
    listaCategoria,
    editarCategoria,
    eliminarCategoria,
}
module.exports = categoriaController;
  
