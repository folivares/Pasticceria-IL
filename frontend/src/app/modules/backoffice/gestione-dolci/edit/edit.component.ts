import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IDolce } from 'src/app/core/models/dolce.model';
import { DolciService } from 'src/app/core/services/dolci.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-bo-dolci-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class DolciEditComponent implements OnInit {

  dolce: IDolce;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private titleService: Title,
    private dolciService: DolciService
  ) {
    this.activatedRoute.params.subscribe(params => this.loadDettaglioDolce(params.id));
  }

  ngOnInit() {
    this.titleService.setTitle('Pasticceria IL - BO - Modifica dolce');
  }

  /**
   * Richiede dettagli dolce a partire da id recuperato dalla route
   * @param id 
   */
  loadDettaglioDolce(id: number) {
    this.dolciService.getDolceById(id)
      .then(
        (result: IDolce) => {
          this.dolce = result;
        }
      )
      .catch((error) => {
        this.notificationService.openSnackBarWithDismiss(error?.error?.response || 'Si è verificato un errore');
      }
      )
      .finally(() => {
        this.changeDetectorRef.detectChanges();
      });
  }

  /**
   * Ricezione dolce da form
   * Invia richiesta di aggiornamento dolce
   * 
   * @param dolceAggiornato 
   */
  onGetDolceAggiornato(dolceAggiornato: IDolce) {
    if (!!dolceAggiornato) {
      this.dolciService.updateDolce(this.dolce.id, dolceAggiornato)
      .then(
        (result: IDolce) => {
          this.dolce = result;
          this.notificationService.openSnackBar('Modifica avvenuta');
        }
      )
      .catch((error) => {
        this.notificationService.openSnackBarWithDismiss(error?.error?.response || 'Si è verificato un errore');
      }
      )
      .finally(() => {
        this.changeDetectorRef.detectChanges();
      });
    }
  }


}
