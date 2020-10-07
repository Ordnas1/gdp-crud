import { createReducer, on, Action } from "@ngrx/store";
import { fromPeliculasActions } from "../actions/peliculas.actions";
import { Store } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pelicula } from "src/shared/interfaces/pelicula";

export interface PeliculaState extends EntityState<Pelicula> {
  peliculasLoaded: boolean;
  error?: Error | any;
}

export const adapter: EntityAdapter<Pelicula> = createEntityAdapter<Pelicula>();


export const initialState: PeliculaState = adapter.getInitialState({
  peliculasLoaded: false
})

const reducer = createReducer(
  initialState,
  on(fromPeliculasActions.loadPeliculasSuccess, (state, action) => (
    adapter.setAll(
      action.peliculas,
      {...state, peliculasLoaded: true}
    )
    )
  ),
  on(fromPeliculasActions.createPelicula, (state, action) => {
    return adapter.addOne(action.pelicula, state)
  }),
  on(fromPeliculasActions.editPelicula, (state,action) => {
    return adapter.updateOne(action.update, state)
  })
)

export function peliculasReducer(state, action) {
  return reducer(state, action)
}

export const {
  selectAll,
  selectIds
} = adapter.getSelectors();


export const selectAllPeliculas = selectAll
