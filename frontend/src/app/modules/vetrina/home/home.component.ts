import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VetrinaService } from 'src/app/core/services/vetrina.service';
import { IDolceVenditaVetrina } from 'src/app/core/models/dolce-vendita-vetrina.model';

@Component({
    selector: 'app-vetrina-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class VetrinaHomeComponent implements OnInit {

    loading: boolean;

    dolciVetrina: IDolceVenditaVetrina[] = null;

    constructor(
        private titleService: Title,
        private notificationService: NotificationService,
        private vetrinaService: VetrinaService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Pasticceria IL - Vetrina');
        this.loadDolciVetrina();
    }

    /**
   * Carica lista dolci vetrina da API REST
   */
    loadDolciVetrina() {
        this.loading = true;
        this.vetrinaService.getAllDolciVetrina()
            .then(
                (result: IDolceVenditaVetrina[]) => {
                    this.dolciVetrina = result;
                }
            )
            .catch((error) => {
                this.notificationService.openSnackBarWithDismiss(error?.error?.response || 'Si è verificato un errore');
            }
            )
            .finally(() => {
                this.loading = false;
            });
    }

}
