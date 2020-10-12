import { Component, OnInit } from '@angular/core';
import { Pelicula } from "src/shared/interfaces/pelicula";
import { Store } from "@ngrx/store";
import { fromPeliculasActions } from "src/core/state/actions/peliculas.actions";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from "uuid"


@Component({
  selector: 'app-addpelicula',
  templateUrl: './addpelicula.component.html',
  styleUrls: ['./addpelicula.component.scss']
})
export class AddpeliculaComponent implements OnInit {
  addForm: FormGroup

  nuevaPelicula: Pelicula = {
    titulo: "",
    fecha_estreno: new Date(),
    disponible: false
  }
  maxDate: Date;
  constructor(private store: Store<{peliculas: Pelicula}>, private fb: FormBuilder) {
    this.maxDate = new Date()
   }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      fecha_estreno: new Date()
    })
  }

    onSubmit(form: FormGroup) {
      console.log(form.value.titulo)
      console.log(form.value.fecha_estreno)
      console.log('Valid?', form.valid)
      this.nuevaPelicula.titulo = this.addForm.value.titulo
      this.nuevaPelicula.fecha_estreno = this.addForm.value.fecha_estreno
      this.addPelicula()
    }


  addPelicula() {
    let newId = uuid.v4()
    this.nuevaPelicula.id = newId
    let letters = /^[A-Za-znÑ0-9 _]*[A-Za-znÑ0-9][A-Za-znÑ0-9 _]*$/
    if ((this.nuevaPelicula.titulo.length >= 3 || this.nuevaPelicula.titulo.length > 25) && this.nuevaPelicula.titulo.match(letters) ) {
      this.store.dispatch(fromPeliculasActions.createPelicula({ pelicula: this.nuevaPelicula }))
    } else {
      console.log("wajooo")
    }

  }


}
