import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  elementLink: HTMLElement | null = document.getElementById('theme');

  constructor() { }

  ngOnInit(): void {
    // Cargar el tema seleccionado por el usuario o aplicar uno por defecto para las páginas que implementen este Layout
    const selectedTheme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.elementLink?.setAttribute('href', selectedTheme)
  }

}
