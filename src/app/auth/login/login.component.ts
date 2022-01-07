import { Component, NgZone, OnInit } from '@angular/core';
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

  auth2!: any;

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuariosServices: UsuariosService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
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
        // Redireccionar al usuario a la sección de Dashboard
        this.router.navigateByUrl('/');
      }, err => {
        Swal.fire('Upss!', err.error.msg, 'error');
        console.log(err);
      })
    }
    // this.router.navigate(['/dashboard']);
  }

  // Google Sign In
  // https://developers.google.com/identity/sign-in/web/build-button
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // No se definen los callback ya que se está trabajando bajo una filosofía de clases en Angular, (se perdería la referencia a this dentro de la definición de esos callbacks)
    });
    this.startApp();
  }

  startApp() {
    // gapi esta declarado a nivel global en el script Platform.js de Google Sign In
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '689500073926-bmqaoupnfdigj6hn3k58mlth5v98b32s.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // Si todo es correcto hacemos login en nuestro backend con el token generado por Google
          // Si el token es correcto, el backend nos retorna un token (propio) de acceso a el app
          this.usuariosServices.loginGoogle(id_token).subscribe(res => {
            // ! Estas tareas de Angular se hacen dentro de una librería de terceros, es importante notificarle a Angular que no pierda el control del ciclo de vida
            this.ngZone.run(() => {
              // Este token lo guardamos en localStorage
              localStorage.setItem('token', res.token)
              // Redireccionar al usuario a la sección de Dashboard
              this.router.navigateByUrl('/');
            })
          }, err => {
            console.log(err);
          })
        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
