import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

}
