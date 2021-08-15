import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

/**
 * 
 * Guard relativo alla gestione delle 
 * route sotto autenticazione
 * 
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private notificationService: NotificationService,
        private authService: AuthenticationService) { }

    canActivate() {
        const user = this.authService.getCurrentAuthUser();
        if (user && user.jwtToken) {
            return true;
        } else {
            this.notificationService.openSnackBar('Effettua il login');
            this.router.navigate(['auth/login']);
            return false;
        }

    }
}
