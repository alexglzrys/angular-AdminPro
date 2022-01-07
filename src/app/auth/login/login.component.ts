import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

// Indicar al builder que esta propiedad se encuentra declarada de forma global por algun script declarado en el index de la aplicación
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  // Construr formulario reactivo
  public formLogin: FormGroup = this.fb.group({
    // Colocamos su email si el usuario desea que se le recuerde
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberme: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuariosServices: UsuariosService) { }

  ngOnInit(): void {
    // Llamar a la función encargada de renderizar el botón de Google Sign In
    this.renderButton();
  }

  login() {
    console.log(this.formLogin.value);

    if (this.formLogin.valid) {
      this.usuariosServices.login(this.formLogin.value).subscribe(res => {
        console.log(res);
        // Verificar si el usuario desea que se le recuerde
        if (this.formLogin.get('rememberme')?.value) {
          // Almacenar su email en LocalStorage
          localStorage.setItem('email', this.formLogin.get('email')?.value);
        } else {
          // No desea que sigamos recordandolo
          localStorage.removeItem('email');
        }
      }, err => {
        Swal.fire('Upss!', err.error.msg, 'error');
        console.log(err);
      })
    }
    // this.router.navigate(['/dashboard']);
  }

  // Google Sign In
  // https://developers.google.com/identity/sign-in/web/build-button
  onSuccess(googleUser: any) {
    // Obtener token de Google
    const id_token = googleUser.getAuthResponse().id_token;
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    console.log(id_token);
  }
  onFailure(error: any) {
    console.log(error);
  }
  renderButton() {
    // gapi esta declarado a nivel global en el script Platform.js de Google Sign In
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }

}
