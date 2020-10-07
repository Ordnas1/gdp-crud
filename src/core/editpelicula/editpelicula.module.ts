import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditpeliculaComponent, EditPeliculaDialog } from './editpelicula.component';
import { Store } from "@ngrx/store";
import { fromPeliculasActions } from "src/core/state/actions/peliculas.actions";
import { RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { MaterialModule } from 'src/shared/material/material.module'
import { MatDialogModule } from "@angular/material/dialog";

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditpeliculaComponent,EditPeliculaDialog],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    RouterModule
  ], exports: [
  ]
})
export class EditpeliculaModule { }
