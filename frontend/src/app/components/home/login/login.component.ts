import { Component, OnInit } from '@angular/core';
//importamos modulos necesarios
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // variable usuario
  public usuario;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = new Usuario ('','','',0,'','','',false);
   }

  ngOnInit(): void {}
  
  //metodo login
  login(loginForm: any) {
    //validamos el formulario es valido
    if (!loginForm.valid) {
      //validamos que los datos no esten comletos
      console.log('Faltan datos obligatorios');
    } else {
      //realizamos el login
      this.usuarioService.login(this.usuario).subscribe(
        (Response) => {
          console.log(Response);
        },
        (error) => {
          console.log('error del response: ', error);
        }
      );
    }
  }
}

