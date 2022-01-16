import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { SidebarService } from 'src/app/services/sidebar.service';

// Llamar scripts (funciones, variables, etc) declarados en archivos importados de forma global en mi aplicación
declare function customInitFunction(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService,
              private sidebarService: SidebarService) { }

  ngOnInit(): void {
    // Cuando el usuario entre en este layout, debo inicializar todos los plugins que contiene esta parte del tema.
    // Esta función se encuentra declarada en el archivo custom.js el cual esta enlazado el index.html de la app.
    // Pero como el componente se crea después de que el app se lance, es necesario inicializar los plugins despues de la creación del componente
    customInitFunction();
    // Cargar el menu almacenado en localStorage (este layout lo va a necesitar)
    this.sidebarService.cargarMenu();
  }

}
