import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  profileForm!: FormGroup

  usuario!: Usuario

  constructor(private fb: FormBuilder,
              private usuariosService: UsuariosService) {
                // las peticiones HTTP se recomienda hacerlas en el ngOnInit, pero esta invocació al servicio no depende de una petición HTTP
                // Una referencia a nuestro modelo usuario (que es un objeto)
                this.usuario = usuariosService.usuario;
              }

  ngOnInit(): void {
    // Inicializar formulario reactivo
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(3)]],
      email: [this.usuario.email, [Validators.email, Validators.required]],
    });
  }



  actualizarPerfil() {
    // Llamar servicio para actualizar datos de usuario
    this.usuariosService.actualizarUsuario(this.profileForm.value).subscribe(res => {
      console.log(res)
      Swal.fire('Perfil actualizado', 'El perfil de usuario fue actualizado con éxito', 'success');
      // Actualizar la nueva data de perfil en las vistas
      // ! Esto funciona ya que los objetos y arreglos en JS trabajan por referencia. Entonces estamos modificando las propiedades del modelo usuario directamente desde esta sección
      this.usuario.nombre = this.profileForm.get('nombre')?.value;
      this.usuario.email = this.profileForm.value.email;
    }, (err) => {
      console.log(err);
      Swal.fire('Upss!', err.error.msg, 'error');
    })
  }

}
