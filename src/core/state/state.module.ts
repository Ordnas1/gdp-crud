import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { peliculasReducer } from "./reducers/peliculas.reducers";
import { sidenavReducer } from "./reducers/sidenav.reducers";
import { EffectsModule } from '@ngrx/effects';
import { PeliculasEffects } from "./effects/peliculas.effects";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('peliculas', peliculasReducer),
    EffectsModule.forRoot([PeliculasEffects])
  ],
  exports: [
    StoreModule
  ]
})
export class StateModule { }
