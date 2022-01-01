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
    // const promesa = new Promise((resolve, reject) => {
    //   if (true) {
    //     resolve('Hola mundo desde el cuerpo de la promesa');
    //   } else {
    //     reject('Error al tratar de resolver la promesa');
    //   }
    // });

    // Ejecutar la promesa: (Una promesa se puede resolver de forma correcta, o rechazar con algún tipo de error)
    // promesa.then((mensaje) => {
    //   console.log(mensaje);
    // }).catch(err => {
    //   console.log(err);
    // })

    // console.log('Fin del ngOnInit');

    // this.getUsuarios();

    this.getUsuarios().then(usuarios => console.log(usuarios));
  }


  getUsuarios() {
    // En angular las promesas se realizan de una forma distinta a la tradicional, sin embargo, podemos seguir usando el Fetch API de ES6
    // https://reqres.in/

    // fetch('https://reqres.in/api/users').then(res => {
    //   res.json().then(body => {
    //     console.log(body);
    //   })
    // });

    // fetch('https://reqres.in/api/users')
    //   .then(res => res.json())
    //   .then(body => {
    //     console.log(body.data)
    //   });

    // Una promesa que encapsula otra promesa, cuyo resultado lo resuleve o la rechaza
    // En este punto, esta función retorna una promesa
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(body => resolve(body.data), err => reject(err));

    })
  }

}
