import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientiAddComponent } from './add/add.component';
import { IngredientiEditComponent } from './edit/edit.component';
import { IngredientiListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '',
        component: IngredientiListComponent
    },
    {
        path: 'list',
        component: IngredientiListComponent
    },
    {
        path: 'edit/:id',
        component: IngredientiEditComponent
    },
    {
        path: 'add',
        component: IngredientiAddComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestioneIngredientiRoutingModule { }
