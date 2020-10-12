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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store < AppState >,
    public api: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.maxDate = new Date()
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern(/^[A-Za-znÑ0-9 _]*[A-Za-znÑ0-9][A-Za-znÑ0-9 _]*$/)]],
      fecha_estreno: ''
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.peliculaId = params.get('id');
      this.api.getPelicula(this.peliculaId).subscribe(
        res => {
          this.currentPelicula = res;
          this.toUpdatePelicula.fecha_estreno = this.currentPelicula.fecha_estreno
          this.editForm.setValue({fecha_estreno: this.toUpdatePelicula.fecha_estreno, titulo: ''})
        }
      )
    });


  }

  onSubmit(form: FormGroup) {
    console.log("valid?", form.valid)
  }

  editPelicula() {
    this.toUpdatePelicula.disponible = this.currentPelicula.disponible
    this.toUpdatePelicula.fecha_estreno = this.editForm.value.fecha_estreno
    this.toUpdatePelicula.titulo = this.editForm.value.titulo

    if(this.toUpdatePelicula.titulo.length >= 3 && this.toUpdatePelicula.titulo.length <= 25) {
      this.api.updatePelicula(this.peliculaId,this.toUpdatePelicula ).subscribe(
        res => {
          this.store.dispatch(fromPeliculasActions.loadPeliculas());
          this.router.navigate([`/${this.peliculaId}`])
        }

      )
    } else {
      console.log("error")
    }


  }

  togglePelicula() {
    this.currentPelicula.disponible = !this.currentPelicula.disponible
    this.api.updatePelicula(this.peliculaId, this.currentPelicula).subscribe(
      res => {
        this.store.dispatch(fromPeliculasActions.loadPeliculas())
        this.router.navigate([`/${this.peliculaId}`])
      }
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
