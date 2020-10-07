import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { FirebaseModule } from "./shared/firebase/firebase.module";
import { StateModule } from "./core/state/state.module";

import { LayoutModule } from "./layout/layout.module";
import { MaterialModule } from "./shared/material/material.module";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environments/environment';
import { StoreModule } from "@ngrx/store";

import { AddpeliculaModule } from "./core/addpelicula/addpelicula.module";
import { EditpeliculaModule} from "./core/editpelicula/editpelicula.module"
import { ApiService } from './shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from "@angular/material/dialog";
// devtools store



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    FirebaseModule,
    StateModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AddpeliculaModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EditpeliculaModule,
    MatDialogModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
