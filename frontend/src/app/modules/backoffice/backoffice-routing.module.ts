import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { BackofficeComponent } from './backoffice.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: BackofficeComponent },
      { path: 'gestione-dolci', loadChildren: () => import('./gestione-dolci/gestione-dolci.module').then(m => m.GestioneDolciModule) },
      { path: 'gestione-ingredienti', loadChildren: () => import('./gestione-ingredienti/gestione-ingredienti.module').then(m => m.GestioneIngredientiModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
