import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';

import { MaterialModule } from "../shared/material/material.module";
import { IndexContainerComponent } from './index-container/index-container.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    IndexContainerComponent
  ]
    ,
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AsideComponent,
  ]
})
export class LayoutModule { }
