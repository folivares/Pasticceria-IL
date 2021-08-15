import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IIngrediente } from 'src/app/core/models/ingrediente.model';
import { IngredientiService } from 'src/app/core/services/ingredienti.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-bo-ingredienti-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class IngredientiEditComponent implements OnInit {

  ingrediente: IIngrediente;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private titleService: Title,
    private ingredientiService: IngredientiService
  ) {
    this.activatedRoute.params.subscribe(params => this.loadDettaglioIngrediente(params.id));
  }

  ngOnInit() {
    this.titleService.setTitle('Pasticceria IL - BO - Modifica ingrediente');
  }

  /**
   * Richiede dettagli ingredient a partire da id recuperato dalla route
   * @param id 
   */
  loadDettaglioIngrediente(id: number) {
    this.ingredientiService.getIngredienteById(id)
      .then(
        (result: IIngrediente) => {
          this.ingrediente = result;
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
   * Ricezione ingrediente da form
   * Invia richiesta di aggiornamento ingrediente
   * @param ingredienteAggiornato 
   */
  onGetIngredienteAggiornato(ingredienteAggiornato: IIngrediente) {
    if (!!ingredienteAggiornato) {
      this.ingredientiService.updateIngrediente(this.ingrediente.id, ingredienteAggiornato)
        .then(
          (result: IIngrediente) => {
            this.notificationService.openSnackBar('Modifica avvenuta');
            this.router.navigate['/backoffice/gestione-ingredienti'];
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
