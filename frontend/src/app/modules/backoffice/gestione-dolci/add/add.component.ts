import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IDolce } from 'src/app/core/models/dolce.model';
import { DolciService } from 'src/app/core/services/dolci.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-bo-dolci-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class DolciAddComponent implements OnInit {

  dolce: IDolce = {
    nome: '',
    ingredientiDolce: [],
    dolceVetrina: null
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private notificationService: NotificationService,
    private titleService: Title,
    private dolciService: DolciService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Pasticcerica IL - BO - Nuovo dolce');
  }

  /**
   * Ricezione dolce da form
   * Invia richiesta di creazione nuovo dolce
   * 
   * @param dolceAggiornato 
   */
  onGetDolceAggiornato(dolceAggiornato: IDolce) {
    if (!!dolceAggiornato) {
      this.dolciService.addDolce(dolceAggiornato)
      .then(
        (result: IDolce) => {
          this.dolce = result;
          this.notificationService.openSnackBar('Dolce ' + dolceAggiornato.nome + ' aggiunto');
          this.router.navigate(['/backoffice/gestione-dolci'])
        }
      )
      .catch((error) => {
        this.notificationService.openSnackBarWithDismiss(error?.error?.response || 'Si è verificato un errore' || 'Si è verificato un errore');
      }
      )
      .finally(() => {
        this.changeDetectorRef.detectChanges();
      });
    }
  }


}
