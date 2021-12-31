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
  links!:NodeListOf<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    // En este punto el HTML del componente ya existe
    // Recuperar el listado de elementos (enlaces) que hacen referencia a los temas disponibles
    this.links = document.querySelectorAll('.selector');

    // Establecer el checked que se corresponde con el tema actualmente selecciondo
    this.checkCurrentTheme()
  }

  // Cambiar el tema de nuestra aplicación (este es un archivo CSS con el nombre del tema pasado como argumento)
  changeTheme(theme: string) {

    const elementHref = `./assets/css/colors/${theme}.css`;
    // Establecer nuevo archivo de CSS al elemento
    this.elementLink?.setAttribute('href', elementHref);
    // Guardar el LocalStorage para persistir los cambios de tema seleccionado
    localStorage.setItem('theme', elementHref);

    // Colocar el checked al elemento actualmente seleccionado
    this.checkCurrentTheme()
  }

  // Colocar un checked al tema seleccionado
  checkCurrentTheme() {
    // Iterar por cada elemento de enlace, retirar la clase working,
    // y colocarla solo en el enlace que haga referencia al tema actualmente seleccionado
    // la propiedad data-theme contiene el nombre del tema que activa ese elemento
    this.links.forEach(element => {
      element.classList.remove('working');
      const url = `./assets/css/colors/${element.dataset.theme}.css`;
      const currentCSS = this.elementLink?.getAttribute('href');

      if (url === currentCSS) {
        element.classList.add('working');
      }
    })
  }

}
