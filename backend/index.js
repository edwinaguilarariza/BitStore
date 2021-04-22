//variables globales de modulos
let express = require("express");//esta variable va a requierr la libreria de express nos piertime guardar el servidor y va y busca el modulo express y lo trae
let bodyParser =  require("body-parser"); //analiza los datos del json que por por la url
let mongoose = require("mongoose");//nos permite manipular mongo db .la coneccion a la base de datos 

//creamos una varable para el puerto de conexion del servidor que vamos a crear en nuestra aplicacion
let port = process.env.port || 3001; // puiede ser 3000 este puerto se maneja en nuestro pc local 3001 al 5000,cuando se sube  a un hosting esto cambia process.env.port


//variable de la aplicacion
let app = express();// eto va acontener todo lo que hagamos en el index.js lo va a ejecutar

//routes de la api
let Usuario = require("./routes/usuario"); //aqui traugo la ruta de usuario 

//conexion a DB
mongoose.connect("mongodb://localhost:27017/bitstoredb", {useUnifiedTopology: true, useNewUrlParser: true},(err,res) => { // primer parametro conexion dela base de datos local  url de coneccion mongodb://localhost:27017/bitstoredb esta es la ruta de conexion de la base de datos de mongo.exe esta useUnifiedTopology: true, useNewUrlParser: true esto es para la seguridad
// el segundo parametro si resivimos u un error o una respuesta
    if (err) {// si recibe un error voy a que me muestre que error se recibe
        console.log(err);// espora es para manejo de ecepciones ,puede que mongo nos traiga errores 
        throw err; //controla los erroees que no sabemos manejar pueden llegar de cualquier lado y. avisa que errores puedden llegar
    } else {
        console.log("servidor DB: ON"); //esto muestra wque si no hay error 
        app.listen(port,function () {//app va a escuchar lo que necesita para que se ejecute y nececita el puerto el va a mirar en el sitema opereativo 
            //el segundo para metro es una funsion// el encesita dos parametros  por dondeescucha el puerto y el mensaje que se quiere mostrar en el callback //cb o fn
            console.log("Servidor BACKEND funcionando en el puerto :" + port);// si sale se esta conectando
        })
    }
}); 

//analizar las url

app.use(bodyParser.urlencoded({extended:true}));//bodyParser esta para que la reeemplazen por una libreria mejor//nuesrta aplicacion va a utizar esa librerias y analizar toda  la url que esten codificadas
app.use(bodyParser.json());//si es un json lo analizara si no no si otro formato no
//usar las rutas (api)
app.use("/api",Usuario)// por estajndar la url debe tener un /api  o /lacalhost etc


//creamos modulo para importar 
module.exports = app;//yo necesito expor para que algien lo importe y app se va encargar de ejercutar todo el documento


