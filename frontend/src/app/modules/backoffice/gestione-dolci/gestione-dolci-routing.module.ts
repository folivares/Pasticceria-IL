import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DolciAddVetrinaComponent } from './add-vetrina/add-vetrina.component';
import { DolciAddComponent } from './add/add.component';
import { DolciEditComponent } from './edit/edit.component';
import { DolciListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '',
        component: DolciListComponent
    },
    {
        path: 'list',
        component: DolciListComponent
    },
    {
        path: 'edit/:id',
        component: DolciEditComponent
    },
    {
        path: 'add',
        component: DolciAddComponent
    },
    {
        path: 'add-vetrina/:id',
        component: DolciAddVetrinaComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestioneDolciRoutingModule { }
