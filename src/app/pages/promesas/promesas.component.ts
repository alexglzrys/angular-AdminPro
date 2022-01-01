import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Construir el cuerpo de una promesa
    // Tareas que se ejecutan de forma asincrona, que no sabemos cuando se vaya a resolver, y no queremos bloquear la ejecución del código
    const promesa = new Promise((resolve, reject) => {
      if (true) {
        resolve('Hola mundo desde el cuerpo de la promesa');
      } else {
        reject('Error al tratar de resolver la promesa');
      }
    });

    // Ejecutar la promesa: (Una promesa se puede resolver de forma correcta, o rechazar con algún tipo de error)
    promesa.then((mensaje) => {
      console.log(mensaje);
    }).catch(err => {
      console.log(err);
    })

    console.log('Fin del ngOnInit');
  }

}
