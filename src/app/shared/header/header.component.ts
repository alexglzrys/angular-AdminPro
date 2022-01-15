import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit(): void {
    // Obtener la URL de perfil de usuario
    //this.userImageUrl = this.usuariosService.usuario.getImageUrl;
    this.usuario = this.usuariosService.usuario;
  }

  logout() {
    this.usuariosService.logout();
  }

  buscar(termino: string) {
    // Si no hay termino de busqueda lo mando al dashboard
    if (termino.length === 0) {
      this.router.navigateByUrl('dashboard');
    }
    // La lista de resultados de búsqueda se muestran en otro componente que apunta a la siguiente ruta
    this.router.navigateByUrl('dashboard/search/' + termino);
  }

}
