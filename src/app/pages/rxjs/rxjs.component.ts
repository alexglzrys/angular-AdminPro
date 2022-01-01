import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {
    // Generar el cuerpo de un Observable
    const obs$ = new Observable(observer => {
      let i = -1;

      const intervalo = setInterval(() => {
        console.log('tick');
        i++;
        // Emitir un valor a mi observer (quien se suscribió a este Observable)
        observer.next(i);

        // Un Observable es un flujo de datos infinito, por lo que debemos ser cuidadosos ya que esto genera desbordamientos de memoria (Se quedan trabajando en segundo plano, y cunado regresamos a la pagina o componente que se suscribe, se genera otro observable del mismo tipo, y así sucesivamente)
        // En estos casos se recomienda desuscribirnos.

        // si deseamos hacerlo finito debemos completar su flujo
        if (i === 4) {
          clearInterval(intervalo);
          // Completar el Observable (terminarlo)
          observer.complete();
        }

        // Un Observable puede lanzar un error
        if (i === 2) {
          clearInterval(intervalo);
          observer.error('Lo sentimos, detectamos un error interno');
        }

      }, 1000);
    })

    // Suscribirse al Observable para que comience a trabajar, de lo contrario no hace nada
    obs$.subscribe(
      data => console.log('Data: ', data),
      err  => console.error('Error', err),
      ()   => console.info('Completado')
    );
  }

  ngOnInit(): void {
  }

}
