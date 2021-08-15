import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestioneIngredientiRoutingModule } from './gestione-ingredienti-routing.module';
import { IngredientiListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngredientiEditComponent } from './edit/edit.component';
import { FormIngredienteComponent } from './components/form-ingrediente/form-ingrediente.component';
import { IngredientiAddComponent } from './add/add.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        GestioneIngredientiRoutingModule
    ],
    declarations: [
        IngredientiListComponent,
        FormIngredienteComponent,
        IngredientiEditComponent,
        IngredientiAddComponent
    ]
})

export class GestioneIngredientiModule { }
