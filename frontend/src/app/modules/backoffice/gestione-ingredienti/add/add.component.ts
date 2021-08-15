import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IIngrediente } from 'src/app/core/models/ingrediente.model';
import { IngredientiService } from 'src/app/core/services/ingredienti.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-bo-ingredienti-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class IngredientiAddComponent implements OnInit {

  ingrediente: IIngrediente = {
    nome: '',
    um: ''
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private notificationService: NotificationService,
    private titleService: Title,
    private ingredientiService: IngredientiService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Pasticcerica IL - BO - Nuovo ingrediente');
  }

  /**
   * Ricezione ingrediente da form
   * Invia richiesta di creazione nuovo ingrediente
   * @param ingredienteAggiornato 
   */
  onGetIngredienteAggiornato(ingredienteAggiornato: IIngrediente) {
    if (!!ingredienteAggiornato) {
      this.ingredientiService.addIngrediente(ingredienteAggiornato)
        .then(
          (result: IIngrediente) => {
            this.ingrediente = result;
            this.notificationService.openSnackBar('Ingrediente ' + ingredienteAggiornato.nome + ' aggiunto');
            this.router.navigate(['/backoffice/gestione-ingredienti'])
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
