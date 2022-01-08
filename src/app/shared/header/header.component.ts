import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  //public userImageUrl!: string;
  public usuario!: Usuario;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    // Obtener la URL de perfil de usuario
    //this.userImageUrl = this.usuariosService.usuario.getImageUrl;
    this.usuario = this.usuariosService.usuario;
  }

  logout() {
    this.usuariosService.logout();
  }

}
