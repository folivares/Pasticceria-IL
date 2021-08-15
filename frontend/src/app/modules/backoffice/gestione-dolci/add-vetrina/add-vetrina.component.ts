import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IDolce } from 'src/app/core/models/dolce.model';
import { IFormAddVetrina } from 'src/app/core/models/form-add-vetrina';
import { DolciService } from 'src/app/core/services/dolci.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VetrinaService } from 'src/app/core/services/vetrina.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-bo-dolci-add-vetrina',
  templateUrl: './add-vetrina.component.html',
  styleUrls: ['./add-vetrina.component.css']
})

export class DolciAddVetrinaComponent implements OnInit {

  dolce: IDolce;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private titleService: Title,
    private dolciService: DolciService,
    private vetrinaService: VetrinaService,
    private dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe(params => this.loadDettaglioDolce(params.id));
  }

  ngOnInit() {
    this.titleService.setTitle('Pasticceria IL - BO - Vendita');
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
   * Riccezione dati da form per l'aggiunta di dolce in vetrina
   * Invia richiesta aggiunta dolce in vetrina
   * 
   * @param formAddVetrina 
   */
  onGetFormCompilato(formAddVetrina: IFormAddVetrina) {
    if (!!formAddVetrina) {
      this.vetrinaService.addDolceToVetrina(this.dolce.id, formAddVetrina)
      .then(
        (result: IDolce) => {
          this.dolce = result;
          this.notificationService.openSnackBar('Vetrina aggiornata');
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

  /**
   * Conferma eliminazione dolce da vetrina tramite dialog
   * 
   */
   deleteFromVetrina() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Rimozione dolce ' + this.dolce.nome + ' da vetrina',
        message: 'Confermi la rimozione del dolce ' + this.dolce.nome + ' dalla vetrina?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.doDeleteFromVetrina();
      }
    });
  }

  /**
   * Eliminazione dolce da vetrina
   * 
   * @param dolce 
   */
  doDeleteFromVetrina() {
    this.vetrinaService.deleteDolceFromVetrina(this.dolce.id)
      .then(
        () => {
          this.dolce.dolceVetrina = null;
          this.notificationService.openSnackBar('Rimozione da vetrina eseguita correttamente');
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
