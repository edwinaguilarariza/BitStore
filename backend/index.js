//variables globales de modulos
let express = require("express");//esta variable va a requierr la libreria de express nos piertime guardar el servidor y va y busca el modulo express y lo trae
let bodyParser =  require("body-parser"); //analiza los datos del json que por por la url
let mongoose = require("mongoose");//nos permite manipular mongo db .la coneccion a la base de datos 

//creamos una varable para el puerto de conexion del servidor que vamos a crear en nuestra aplicacion
let port = process.env.port || 3001; // puiede ser 3000 este puerto se maneja en nuestro pc local 3001 al 5000,cuando se sube  a un hosting esto cambia process.env.port




//variable de la aplicacion
let app = express();// eto va acontener todo lo que hagamos en el index.js lo va a ejecutar


app.listen(port,() => {
    //app va a escuchar lo que necesita para que se ejecute y nececita el puerto el va a mirar en el sitema opereativo 
        //el segundo para metro es una funsion// el encesita dos parametros  por dondeescucha el puerto y el mensaje que se quiere mostrar en el callback //cb o fn
        console.log("Servidor BACKEND funcionando en el puerto :" + port);// si sale se esta conectando
    });

//routes de la api
let Usuario = require("./routes/usuario"); //aqui traugo la ruta de usuario 
let Categoria = require("./routes/categoria");
let Curso = require("./routes/curso");
let Estudiante = require("./routes/estudiante");
let Compra = require("./routes/compra");

//conexion a DB
mongoose.connect("mongodb://localhost:27017/bitstoredb", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false , useCreateIndex: true})
.then(() => console.log("conexion mongodb : ON"))
.catch((err) => console.log("conexion a mongoDB: off")) // primer parametro conexion dela base de datos local  url de coneccion mongodb://localhost:27017/bitstoredb esta es la ruta de conexion de la base de datos de mongo.exe esta useUnifiedTopology: true, useNewUrlParser: true esto es para la seguridad
// el segundo parametro si resivimos u un error o una respuesta
 

//analizar las url

app.use(bodyParser.urlencoded({extended:true}));//bodyParser esta para que la reeemplazen por una libreria mejor//nuesrta aplicacion va a utizar esa librerias y analizar toda  la url que esten codificadas
app.use(bodyParser.json());//si es un json lo analizara si no no si otro formato no
//usar las rutas (api)

//estos sol los temasdel response de angular reglasde acesso de comunicacion para las apis entre angular react vue
app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
  });
  


app.use("/api",Usuario);// por estajndar la url debe tener un /api  o /lacalhost etc
app.use("/api", Categoria);//
app.use("/api", Curso);
app.use("/api", Estudiante); 
app.use("/api", Compra);


//creamos modulo para importar 
module.exports = app;//yo necesito expor para que algien lo importe y app se va encargar de ejercutar todo el documento


