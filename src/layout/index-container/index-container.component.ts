import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { getAllPeliculas } from "src/core/state/selectors/peliculas.selectors";
import { fromPeliculasActions } from "src/core/state/actions/peliculas.actions";
import { Pelicula } from "src/shared/interfaces/pelicula";
import { ApiService } from "src/shared/api/api.service";
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';


@Component({
  selector: 'app-index-container',
  templateUrl: './index-container.component.html',
  styleUrls: ['./index-container.component.scss']
})
export class IndexContainerComponent implements OnInit {
  items:Observable<Pelicula[]>;

  constructor(private store: Store<{peliculas: Pelicula[]}>, private api: ApiService) {

  }

  ngOnInit(): void {
    this.loadItems()
  }

  loadItems(): void {
    this.store.dispatch(fromPeliculasActions.loadPeliculas())
    this.items = this.store.select(getAllPeliculas)
  }


}
