import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'vetrina',
        pathMatch: 'full'
    },
    {
        path: 'vetrina',
        loadChildren: () => import('./modules/vetrina/vetrina.module').then(m => m.VetrinaModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'backoffice',
        loadChildren: () => import('./modules/backoffice/backoffice.module').then(m => m.BackofficeModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
