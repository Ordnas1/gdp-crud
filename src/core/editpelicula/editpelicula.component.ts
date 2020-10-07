import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Pelicula } from "src/shared/interfaces/pelicula";
import { getAllPeliculas, selectPeliculabyID, arePeliculasLoaded } from "src/core/state/selectors/peliculas.selectors";
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import { ApiService } from "src/shared/api/api.service";
import { MaterialModule } from 'src/shared/material/material.module'
import { fromPeliculasActions } from "src/core/state/actions/peliculas.actions";
import { windowWhen } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';


export interface AppState {

}

@Component({
  selector: 'app-editpelicula',
  templateUrl: './editpelicula.component.html',
  styleUrls: ['./editpelicula.component.scss']
})
export class EditpeliculaComponent implements OnInit {

  dialogRef: any;

  peliculaId: any;

  peliculas: Observable<Pelicula[]>

  currentPelicula: Pelicula;

  maxDate: Date;

  toUpdatePelicula: Pelicula = {
    titulo: "",
    fecha_estreno: new Date(),
  }

  constructor(private route: ActivatedRoute, private store: Store < AppState >, public api: ApiService, public dialog: MatDialog) {
    this.maxDate = new Date()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.peliculaId = params.get('id');
      this.api.getPelicula(this.peliculaId).subscribe(
        res => {
          this.currentPelicula = res;
          this.toUpdatePelicula.fecha_estreno = this.currentPelicula.fecha_estreno
        }
      )
    });

  }

  editPelicula() {
    this.toUpdatePelicula.disponible = this.currentPelicula.disponible

    if(this.toUpdatePelicula.titulo.length >= 3 && this.toUpdatePelicula.titulo.length <= 25) {
      this.api.updatePelicula(this.peliculaId,this.toUpdatePelicula ).subscribe(
        res => {window.location.assign("/")}
      )
    } else {
      console.log("error")
    }


  }

  togglePelicula() {
    this.currentPelicula.disponible = !this.currentPelicula.disponible
    console.log(this.currentPelicula.disponible)
    this.api.updatePelicula(this.peliculaId, this.currentPelicula).subscribe(
      res => window.location.assign("/")
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditPeliculaDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.editPelicula();
    });
  }

  setDialogRef() {
    this.dialogRef = this.dialog.open(EditPeliculaDialog)

  }
}

@Component({
  selector: 'app-editpelicula-dialog',
  templateUrl: './editpelicula-dialog.html'
})
export class EditPeliculaDialog {

  id: any;
  data: Pelicula;

  constructor(
    public dialogRef: MatDialogRef<EditpeliculaComponent>,
    @Inject(MAT_DIALOG_DATA) public pelicula: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();

  }

  editPelicula() {
    this.id = this.dialogRef.componentInstance.peliculaId
    this.data = this.pelicula
    this.dialogRef.componentInstance.editPelicula()
  }
}
