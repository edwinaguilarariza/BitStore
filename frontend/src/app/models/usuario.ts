//exportamos la clase
export class Usuario{
    //constructor
    constructor(
        public _id: String,
        public nombre: String,
        public apellidos: String,
        public edad: Number,
        public correo: String,
        public pass: String,
        public rol: String,
        public getToken: boolean
    ){}
}

    