import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  links!:NodeListOf<HTMLElement>;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    // En este punto el HTML del componente ya existe
    // Recuperar el listado de elementos (enlaces) que hacen referencia a los temas disponibles
    this.links = document.querySelectorAll('.selector');
    // Establecer el checked que se corresponde con el tema actualmente selecciondo
    this.settingsService.checkCurrentTheme(this.links)
  }

  changeTheme(theme: string) {
    // Invocar el servicio para cambiar el tema
    this.settingsService.changeTheme(theme);
    // Colocar el checked al elemento actualmente seleccionado
    this.settingsService.checkCurrentTheme(this.links);
  }

}
