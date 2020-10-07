import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Pelicula } from "src/shared/interfaces/pelicula";
import { PeliculaState, selectAllPeliculas, selectIds } from '../reducers/peliculas.reducers'

export const FEATURE_NAME = "peliculas";


const peliculasFeatureSelector = createFeatureSelector<PeliculaState>("peliculas")

export const getAllPeliculas = createSelector(
  peliculasFeatureSelector,
  selectAllPeliculas
)

export const arePeliculasLoaded = createSelector(
  peliculasFeatureSelector,
  state => state.peliculasLoaded
)

export const selectPeliculabyID = createSelector(
  peliculasFeatureSelector,
  (peliculas,props) => peliculas[props.ids.id]
)
