import { createAction, props } from "@ngrx/store";
import { Pelicula } from "src/shared/interfaces/pelicula";
import { Update } from "@ngrx/entity";

enum PeliculasActionType {
  LoadPeliculas = "[Peliculas] Load List",
  LoadPeliculasSuccess = "[Peliculas] Load List Success",
  LoadPeliculasFail = "[Peliculas] Load List Fail",
  CreatePelicula = "[Peliculas] Create Pelicula",
  EditPelicula = "[Peliculas] Edit Peliculas"
}

const loadPeliculas = createAction(PeliculasActionType.LoadPeliculas)
const loadPeliculasSuccess = createAction(PeliculasActionType.LoadPeliculasSuccess, props<{ peliculas: Pelicula[]}>())
const loadPeliculasFail = createAction(PeliculasActionType.LoadPeliculasFail, props<{ error: Error | any}>())
const createPelicula = createAction(PeliculasActionType.CreatePelicula, props<{ pelicula: Pelicula}>())
const editPelicula = createAction(PeliculasActionType.EditPelicula, props<{ update: Update<Pelicula>}>())


export const fromPeliculasActions = {
  loadPeliculas,
  loadPeliculasSuccess,
  loadPeliculasFail,
  createPelicula,
  editPelicula
}
