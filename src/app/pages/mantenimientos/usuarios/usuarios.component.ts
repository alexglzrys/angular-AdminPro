import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare const toastr: any;
declare const $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  totalUsuarios!: number;
  usuarios!: Usuario[];
  desde: number = 0;
  copiaUsuariosTemporales!: Usuario[];
  // Propiedad de control para mostrar la carga de información que viaja desde el servicioo
  cargando: boolean = false;

  constructor(private usuariosServices: UsuariosService,
              private busquedaService: BusquedaService) { }

  ngOnInit(): void {
    this.cargarUsuarios()
  }

  cargarUsuarios() {
    this.cargando = true;
    // Consultar usuarios registrados
    // Indicar a partir de que registro se debe mostrar la información
    this.usuariosServices.obtenerUsuarios(this.desde).subscribe(({ total, usuarios}) => {
      // De la respuesta solo me sirve el total y la coleccion de usuarios (desestructuración)
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.copiaUsuariosTemporales = this.usuarios;
      this.cargando = false;
    }, err => {
      this.cargando = false;
    })
  }

  // Hacer una nueva petición de usuarios si el valor del paginador cambia
  cambiarPagina(valor: number) {
    this.desde += valor;
    // Evitar desbordamientos
    if (this.desde <= 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios()
  }

  buscarUsuarios(termino: string): boolean | void {
    console.log(termino)
    // Si no hay termino de busqueda, cancelamos la operación y mostramos el listado de usuarios temporales (ultima paginación)
    if (termino.length === 0) {
      this.usuarios = this.copiaUsuariosTemporales;
      return;
    }

    this.busquedaService.buscar('usuarios', termino).subscribe(usuarios => {
      // Actualizar el listado de usuarios (contenido de la tabla)
      this.usuarios = usuarios;
    })
  }

  eliminarUsuario(usuario: Usuario): void | boolean {
    // El usuario actual no puede eliminarse a si mismo del sistema
    if (usuario.uid === this.usuariosServices.uid) {
      Swal.fire('Upss!', 'No puede eliminarse a si mismo', 'error');
      return;
    }
    // Mostrar alerta de confirmación de eliminación
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Realmente deseas eliminar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceder a eliminar el usuario seleccinoado
        this.usuariosServices.eliminarUsuario(usuario).subscribe(res => {
          // Lo mejor será volver a consultar el server, por cuestiones de la paginación
          this.cargarUsuarios();
          Swal.fire(
            'Eliminado!',
            `El usuario ${ usuario.nombre } fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

  actualizarRole(usuario: Usuario) {
    this.usuariosServices.actualizarRoleUsuario(usuario).subscribe(res => {
      // En ocasiones no conviene mostrar un alert o confirmación.,
      // Quiza convenga un TOAST
      toastr.info('Rol actualizado en el sistema', 'Aviso', {"positionClass": "toast-bottom-center" });
    })
  }

  mostrarModal() {
    $("#modalActualizarImagen").modal('show');
  }

}
