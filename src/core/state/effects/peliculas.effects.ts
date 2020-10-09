import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, throwError } from 'rxjs';
import { map, concatMap, catchError, tap } from 'rxjs/operators';
import { ApiService } from "src/shared/api/api.service";
import { fromPeliculasActions } from "../actions/peliculas.actions";
import { Router } from '@angular/router';

@Injectable()
export class PeliculasEffects {

  constructor(
    private actions$: Actions,
    private service: ApiService,
    private router: Router
  ) {}

  loadPelicula$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPeliculasActions.loadPeliculas),
      concatMap(() => this.service.getAllPeliculas()),
      map(peliculas => fromPeliculasActions.loadPeliculasSuccess({peliculas}))
    )
  )

  createPelicula$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPeliculasActions.createPelicula),
      concatMap((action) => this.service.createPelicula(action.pelicula)),
      tap((pelicula) => this.router.navigateByUrl(`/${pelicula.id}`))
    ),
    {dispatch: false}
  );

  updatePelicula$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPeliculasActions.editPelicula),
      concatMap((action) => this.service.updatePelicula(action.update.id, action.update.changes))
    ),
    {dispatch: false}
  )
}
