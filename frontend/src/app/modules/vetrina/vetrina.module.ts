import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VetrinaRoutingModule } from './vetrina-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { VetrinaHomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VetrinaRoutingModule,
    CommonModule
  ],
  declarations: [VetrinaHomeComponent]
})
export class VetrinaModule { }
