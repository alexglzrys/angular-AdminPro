import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
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

  constructor(private usuariosServices: UsuariosService) { }

  ngOnInit(): void {
    // Consultar usuarios registrados
    this.usuariosServices.obtenerUsuarios(0).subscribe(({ total, usuarios}) => {
      // De la respuesta solo me sirve el total y la coleccion de usuarios (desestructuración)
      this.totalUsuarios = total;
      this.usuarios = usuarios;
    })
  }

}
