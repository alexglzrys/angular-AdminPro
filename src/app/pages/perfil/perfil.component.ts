import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
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
  imagenCargada!: File;
  imagenTemporal!: string | null | ArrayBuffer;

  constructor(private fb: FormBuilder,
              private usuariosService: UsuariosService,
              private fileUploadService: FileUploadService) {
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

  // Este metodo se dispara cuando el control de archivos (file), cambia su valor (se carga una imagen)
  cargarImagen(event: any): void | null {
    //console.log(event);
    // Obtener la referencia hacia la imagen (toda su información)
    this.imagenCargada = event.target.files[0];

    // No se selecciono imagen, por tanto no hay nada que mostrar
    if (!this.imagenCargada) return this.imagenTemporal = null;

    // Mostrar vista previa imagen seleccionada en base64
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenCargada);
    reader.onloadend = () => {
      this.imagenTemporal = reader.result;
    }
  }

  // Actualizar la imagen en el backend
  actualizarImagenPerfil() {
    this.fileUploadService.actualizarFoto(this.imagenCargada, 'usuarios', this.usuario.uid!).then(res => {
      if (res.ok) {
        //console.log(res.nombreArchivo);
        Swal.fire('Imagen actualizada', 'La imagen de perfil se actualizó correctamente', 'success');
        // Actualizar imagen en vistas (gracias a la referencia de objetos)
        this.usuario.img = res.nombreArchivo;
      } else {
        Swal.fire('Upss!', res.msg, 'error');
      }
    }).catch(err => {
      console.log(err);
      Swal.fire('Upss!', err.error.msg, 'error')
    })
  }

}
