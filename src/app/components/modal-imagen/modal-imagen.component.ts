import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

declare const toastr: any;

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {



  imagenCargada!: File;
  imagenTemporal!: string | null | ArrayBuffer;
  usuario!: Usuario

  // Inyecto el servicio de forma pública para tener acceso al mismo desde la vista
  constructor(public modalImagenService: ModalImagenService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
  }

  // Este metodo se dispara cuando el control de archivos (file), cambia su valor (se carga una imagen)
  cargarImagen(event: any): void | null {
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
    const id: string  = this.modalImagenService.id
    const coleccion: 'usuarios'|'medicos'|'hospitales' = this.modalImagenService.coleccion as 'usuarios'|'medicos'|'hospitales';

    this.fileUploadService.actualizarFoto(this.imagenCargada, coleccion, id).then(res => {
      if (res.ok) {

        this.modalImagenService.cerrarModal()
        // Emitir evento para notificar a quien esté suscrito (tabla) que debe refrescar los nuevos cambios (ver la nueva imagen)
        this.modalImagenService.nuevaImagen.emit(res.nombreArchivo)
        toastr.info('Avatar actualizado en el sistema', 'Aviso', {"positionClass": "toast-bottom-center" });
      } else {
        //Swal.fire('Upss!', res.msg, 'error');
        this.modalImagenService.cerrarModal()
      }
    }).catch(err => {
      console.log(err);
      //Swal.fire('Upss!', err.error.msg, 'error')
    })
  }

}
