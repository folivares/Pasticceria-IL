import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VetrinaHomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: VetrinaHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VetrinaRoutingModule { }
