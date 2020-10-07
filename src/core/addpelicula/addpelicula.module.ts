import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddpeliculaComponent } from './addpelicula.component';
import { MaterialModule } from "src/shared/material/material.module";
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [AddpeliculaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports:[
    AddpeliculaComponent
  ]
})
export class AddpeliculaModule { }
