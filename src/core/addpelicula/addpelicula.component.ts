import { Component, OnInit } from '@angular/core';
import { Pelicula } from "src/shared/interfaces/pelicula";
import { Store } from "@ngrx/store";
import { fromPeliculasActions } from "src/core/state/actions/peliculas.actions";
import * as uuid from "uuid"

@Component({
  selector: 'app-addpelicula',
  templateUrl: './addpelicula.component.html',
  styleUrls: ['./addpelicula.component.scss']
})
export class AddpeliculaComponent implements OnInit {
  nuevaPelicula: Pelicula = {
    titulo: "",
    fecha_estreno: new Date(),
    disponible: false
  }
  maxDate: Date;
  constructor(private store: Store<{peliculas: Pelicula}>) {
    this.maxDate = new Date()
   }

  ngOnInit(): void {
  }

  addPelicula() {
    let newId = uuid.v4()
    this.nuevaPelicula.id = newId
    let letters = /^[A-Za-znÑ0-9 _]*[A-Za-znÑ0-9][A-Za-znÑ0-9 _]*$/
    if ((this.nuevaPelicula.titulo.length >= 3 || this.nuevaPelicula.titulo.length > 25) && this.nuevaPelicula.titulo.match(letters) ) {
      this.store.dispatch(fromPeliculasActions.createPelicula({ pelicula: this.nuevaPelicula }))
      window.location.assign(`/${this.nuevaPelicula.id}`)
    } else {
      console.log("wajooo")
    }

  }


}
