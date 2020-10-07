import { Component, ViewChild } from '@angular/core';
import { fromPeliculasActions } from "src/core/state/actions/peliculas.actions";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-angular';


  constructor() {
  }


  ngOnInit(): void {
    this.loadMovies()

  }

  loadMovies() {

  }
}
