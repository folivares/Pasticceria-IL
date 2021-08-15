import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ProgressBarService } from '../services/progress-bar.service';

/**
 * 
 * Interceptor HTTP per la gestione centralizzata
 * dei loader sui componenti che si sottoscrivono
 * al ProgressBarService
 * 
 */
@Injectable({
    providedIn: 'root'
})
export class ProgressBarInterceptor implements HttpInterceptor {

    constructor(
        private progressBarService: ProgressBarService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        setTimeout(() => {
            this.progressBarService.show();
        });
        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        setTimeout(() => {
                            this.progressBarService.hide();
                        });
                    }
                }, (error) => {
                    setTimeout(() => {
                        this.progressBarService.hide();
                    });

                })
            );
    }
}
