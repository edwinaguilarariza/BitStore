import { Injectable } from '@angular/core';
//importamos modulos necesarios
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { global } from './GLOBAL';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //creamos variable para la url
  public url;
  public usuario;

  //constructor de la clase
  constructor( private http: HttpClient ) {
    // le asignamos  la url del backend a la variable global
    this.url = global.url;
    //inicializamos el modelo de usuario
    this.usuario = new Usuario('','','',0,'','','',false);
  }

  //metodo para hacer login
  login(usuario: Usuario, getToken = true): Observable<any>{
    //Variable que almacene los datos del usuario
    let json = usuario;
    //validamos si llega un token
    if (!getToken) {
      
    } else {
      usuario.getToken = true;
    }
    //cabecera Headers del request
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //enviamos y resibimos la PETICION  
    return this.http.post(this.url + 'login', json, {headers:headers});
  }




  //metodo para obtener el token
  getToken(){}

  //metoodo para los datos de lusuario
  getIdentity(){}

}
