import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // Obtener la referencia al elemento de link CSS por su id (ver index.html)
  elementLink: HTMLElement | null = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
  }

  // Cambiar el tema de nuestra aplicación (este es un archivo CSS con el nombre del tema pasado como argumento)
  changeTheme(theme: string) {

    const elementHref = `./assets/css/colors/${theme}.css`;
    // Establecer nuevo archivo de CSS al elemento
    this.elementLink?.setAttribute('href', elementHref);

    // Guardar el LocalStorage para persistir los cambios de tema seleccionado
    localStorage.setItem('theme', elementHref);
  }

}
