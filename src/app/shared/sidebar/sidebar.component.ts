import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

// Indicarle a TS que la siguiente declaración $ (jquery) ya existe en el alcance global de la aplicación
declare let $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {

  menuItems!: any[];

  constructor(private sidebarService: SidebarService,
              private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
  }

  ngAfterViewInit(): void {
    // Una vez que los elementos del menu están definidos, inicializo el plugin de jQuery para animarlos,
    // Esta instrucción está definida en el archivo custom.js, pero como el componente (sidebar) aun no existe cuando la app se inicia,
    // entonces no encunetra referencia alguna del elemento (para inicializarlo), por lo que su animación no existe
    $('#sidebarnav').AdminMenu();
  }

  logout() {
    this.usuariosService.logout();
  }

}
