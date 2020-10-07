import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { toggle } from "src/core/state/actions/sidenav.actions";
import { RouterModule, Routes } from '@angular/router';
import { Pelicula } from "src/shared/interfaces/pelicula";


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  showNav$: Observable<boolean>
  peliculas$: Observable<Pelicula>

  constructor(private store: Store<{ showNav: boolean }>) {
    this.showNav$ = store.select("showNav")
   }

  ngOnInit(): void {
  }



}
