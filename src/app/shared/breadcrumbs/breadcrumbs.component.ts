import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Data, Event, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  title: string = '';
  miObservableTituloRuta$!: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.miObservableTituloRuta$ = this.getDataAdicionalRuta().subscribe((data: Data) => {
      // Asignar titulo que viaja como data adicional en la ruta
      this.title = data.title
      document.title = `Angular AdminPro - ${this.title}`;

      // Otra forma de hacer lo mismo pero más sintetizado
      this.otraFormaRecuperarDataAdicionalRuta()
    });
  }

  ngOnDestroy(): void {
    // Este observable se ejecuta de forma infinita, por tanto, por buenas prácticas debemos destruirlo cuando el componente deja de existir
    this.miObservableTituloRuta$.unsubscribe();
  }

  ngOnInit(): void {

  }

  getDataAdicionalRuta() {
    // Suscribirme a los eventos del router
    return this.router.events
        .pipe(
          // Al entrar a una nueva ruta suceden muchos eventos, solo me interesa el ActivationEnd
          filter((event: any) => event instanceof ActivationEnd ),
          // Por cada router-outlet anidado, hay un evento de ActivationEnd, solo me interesa el que no sea el que no sea el primer hijo
          filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
          // De ese evento solo me interesa obtener su data
          map((event: ActivationEnd) => event.snapshot.data)
        );
  }

  otraFormaRecuperarDataAdicionalRuta() {
    // El router principal es el que se obtiene por defecto, para ello debemos acceder a sus hijos (router-outlet anidados)
    this.activatedRoute.url.subscribe(() => {
      console.log(this.activatedRoute.snapshot.firstChild?.data);
    })
  }

}
