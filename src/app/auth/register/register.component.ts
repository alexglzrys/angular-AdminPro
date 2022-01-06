import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  // Construir formulario reactivo
  public registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirm: ['', [Validators.required, Validators.minLength(8)]],
    terminos: [false, Validators.required]
  });

  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registrarUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    // Proceder a registrar usuario
    if (this.registerForm.valid) {
      console.log('Posteando formulario con datos correctos')
    } else {
      console.log('Formulario incorrecto')
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  noAceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

}
