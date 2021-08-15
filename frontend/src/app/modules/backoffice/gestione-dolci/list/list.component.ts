import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { IDolce } from 'src/app/core/models/dolce.model';
import { DolciService } from 'src/app/core/services/dolci.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-bo-dolci-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class DolciListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  currentAuthUser: any;
  displayedColumns: string[] = ['id', 'nome', 'ingredienti', 'azioni'];
  dolci: IDolce[] = null;
  dataSource = new MatTableDataSource([]);

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private titleService: Title,
    private dolciService: DolciService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Pasticceria IL - BO - Lista dolci');
    this.loadDolci();
  }

  /**
   * Carica lista dolci da API REST
   */
  loadDolci() {
    this.dolciService.getAllDolci()
      .then(
        (result: IDolce[]) => {
          this.dolci = result;
          this.dataSource.data = this.dolci;
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
   * Conferma eliminazione dolce tramite dialog
   * 
   * @param dolce 
   */
  deleteDolce(dolce: IDolce) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Rimozione dolce ' + dolce.nome,
        message: 'Confermi la rimozione del dolce ' + dolce.nome + '?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.doDeleteDolce(dolce);
      }
    });
  }

  /**
   * Eliminazione dolce
   * ricarica la lista se eliminazione avviene correttamente
   * 
   * @param dolce 
   */
  doDeleteDolce(dolce: IDolce) {
    this.dolciService.deleteDolce(dolce.id)
      .then(
        (result: IDolce) => {
          this.notificationService.openSnackBar('Rimozione eseguita correttamente');
          this.loadDolci();
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
