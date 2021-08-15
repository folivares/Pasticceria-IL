import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BackofficeComponent } from './backoffice.component';

@NgModule({
  declarations: [
    BackofficeComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule
  ],
  entryComponents: []
})
export class BackofficeModule { }
