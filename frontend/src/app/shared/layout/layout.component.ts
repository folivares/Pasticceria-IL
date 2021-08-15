import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { IUtente } from 'src/app/core/models/utente.model';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

/**
 * 
 * Layout per le pagine di amministrazione con toolbar e sidenav
 * Gestisce l'aspetto della sidenav su mobile tramite
 * MediaMatcher
 * 
 */
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    utente: IUtente;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public progressBarService: ProgressBarService,
        private authenticationService: AuthenticationService,
        private router: Router) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', () => {
            this.mobileQueryListener;
        })
    }

    ngOnInit(): void {
        this.utente = this.authenticationService.getCurrentAuthUser();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    closeMenuLatOnMobile(menulat: MatSidenav): void {
        if (this.mobileQuery.matches) {
            menulat.close();
        }
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }

}
