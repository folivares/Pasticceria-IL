import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestioneDolciRoutingModule } from './gestione-dolci-routing.module';
import { DolciListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DolciEditComponent } from './edit/edit.component';
import { FormDolceComponent } from './components/form-dolce/form-dolce.component';
import { DolciAddComponent } from './add/add.component';
import { DolciAddVetrinaComponent } from './add-vetrina/add-vetrina.component';
import { FormVetrinaComponent } from './components/form-vetrina/form-vetrina.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        GestioneDolciRoutingModule
    ],
    declarations: [
        DolciListComponent,
        FormDolceComponent,
        FormVetrinaComponent,
        DolciEditComponent,
        DolciAddComponent,
        DolciAddVetrinaComponent
    ]
})

export class GestioneDolciModule { }
