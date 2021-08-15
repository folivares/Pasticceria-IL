import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

/**
 * 
 * Interceptor HTTP per la gestione del 
 * jwt token su header delle request
 * 
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService,
        private router: Router,
        private dialog: MatDialog) { }

    /**
     * Intercetta richiesta e aggiungi token se utente presente
     * 
     * @param request 
     * @param next 
     * @returns HttpRequest -> intercepted request
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.getCurrentAuthUser();
        if (user && user.jwtToken) {
            request = this.addTokenToRequestHeader(request, user.jwtToken);
        }
        return next.handle(request).pipe(tap(() => { }, (err: any) => {
            // gestione token scaduto
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.authService.logout();
                    this.dialog.closeAll();
                    this.router.navigate(['/auth/login']);
                }
            }
        }));
    }

    /**
     * Aggiungi token
     * 
     * @param request 
     * @param token 
     * @returns HttRequest -> cloned request
     */
    private addTokenToRequestHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
