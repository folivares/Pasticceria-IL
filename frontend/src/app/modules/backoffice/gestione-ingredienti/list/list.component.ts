import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { IIngrediente } from 'src/app/core/models/ingrediente.model';
import { IngredientiService } from 'src/app/core/services/ingredienti.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-bo-ingredienti-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class IngredientiListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  currentAuthUser: any;
  displayedColumns: string[] = ['id', 'nome', 'um', 'azioni'];
  ingredienti: IIngrediente[] = null;
  dataSource = new MatTableDataSource([]);

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private titleService: Title,
    private ingredientiService: IngredientiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Pasticceria IL - BO - Lista ingredienti');
    this.loadIngredienti();
  }

  /**
   * Carica lista ingredienti da API REST
   */
  loadIngredienti() {
    this.ingredientiService.getAllIngredienti()
      .then(
        (result: IIngrediente[]) => {
          this.ingredienti = result;
          this.dataSource.data = this.ingredienti;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
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
   * Evento filtra della tabella
   * @param event 
   */
  filtraTabella(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Conferma eliminazione ingrediente tramite dialog
   * 
   * @param ingrediente 
   */
  deleteIngrediente(ingrediente: IIngrediente) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Rimozione ingrediente ' + ingrediente.nome,
        message: 'Confermi la rimozione dell\'ingrediente ' + ingrediente.nome + '?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.doDeleteIngrediente(ingrediente);
      }
    });
  }

  /**
   * Eliminazione ingrediente
   * ricarica la lista se eliminazione avviene correttamente
   * 
   * @param ingrediente 
   */
  doDeleteIngrediente(ingrediente: IIngrediente) {
    this.ingredientiService.deleteIngrediente(ingrediente.id)
      .then(
        (result: IIngrediente) => {
          this.notificationService.openSnackBar('Rimozione eseguita correttamente');
          this.loadIngredienti();
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
