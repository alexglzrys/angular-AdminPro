import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Obtener la referencia al elemento de link CSS por su id (ver index.html)
  private elementLink: HTMLElement | null = document.getElementById('theme');

  constructor() {
    // Cargar el tema seleccionado por el usuario o aplicar uno por defecto para las páginas que implementen este Layout
    const selectedTheme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.elementLink?.setAttribute('href', selectedTheme)
  }

  // Cambiar el tema de nuestra aplicación (este es un archivo CSS con el nombre del tema pasado como argumento)
  changeTheme(theme: string) {
    const elementHref = `./assets/css/colors/${theme}.css`;
    // Establecer nuevo archivo de CSS al elemento
    this.elementLink?.setAttribute('href', elementHref);
    // Guardar el LocalStorage para persistir los cambios de tema seleccionado
    localStorage.setItem('theme', elementHref);
  }

  // Colocar un checked al tema seleccionado
  checkCurrentTheme(links: NodeListOf<HTMLElement>) {
    // Iterar por cada elemento de enlace, retirar la clase working,
    // y colocarla solo en el enlace que haga referencia al tema actualmente seleccionado
    // la propiedad data-theme contiene el nombre del tema que activa ese elemento
    links.forEach(element => {
      element.classList.remove('working');
      const url = `./assets/css/colors/${element.dataset.theme}.css`;
      const currentCSS = this.elementLink?.getAttribute('href');

      if (url === currentCSS) {
        element.classList.add('working');
      }
    })
  }

}
