import { NgModule } from '@angular/core';
import { AddpeliculaComponent } from "./core/addpelicula/addpelicula.component";
import { EditpeliculaComponent } from "./core/editpelicula/editpelicula.component";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"add", component: AddpeliculaComponent},
  {path:":id", component: EditpeliculaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
