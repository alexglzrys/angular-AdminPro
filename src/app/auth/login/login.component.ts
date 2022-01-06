import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  // Construr formulario reactivo
  public formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberme: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuariosServices: UsuariosService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.formLogin.value);

    if (this.formLogin.valid) {
      this.usuariosServices.login(this.formLogin.value).subscribe(res => {
        console.log(res);
      }, err => {
        Swal.fire('Upss!', err.error.msg, 'error');
        console.log(err);
      })
    }
    // this.router.navigate(['/dashboard']);
  }

}
