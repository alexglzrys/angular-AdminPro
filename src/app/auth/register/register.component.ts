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
  }, {
    // Validators personalizados sincronos
    validators: this.passwordIguales('password', 'password_confirm')
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

  // Funciones para mostrar mensajes de validación

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsNoIguales(): boolean {
    return (this.registerForm.get('password')?.value !== this.registerForm.get('password_confirm')?.value) && this.formSubmitted;
  }

  noAceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  // Validator personalizado

  passwordIguales(campo1: string, campo2: string): Function {
    // Retornar una función, pues recibe parámetros
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get('password');
      const pass2 = formGroup.get('password_confirm');

      if (pass1?.value === pass2?.value) {
        pass2?.setErrors(null);
      } else {
        // Hay errores y debo retornar el objeto con el error
        pass2?.setErrors({ noIguales: true });
      }
    }
  }

}
