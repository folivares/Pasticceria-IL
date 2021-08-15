import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDolceVenditaVetrina } from 'src/app/core/models/dolce-vendita-vetrina.model';

/**
 * 
 * Componente per la visualizzazione degli ingredienti
 * di un dolce della vetrina tramite dialog
 * 
 */
@Component({
  selector: 'app-dolce-vetrina-info-dialog',
  templateUrl: './dolce-vetrina-info-dialog.component.html',
  styleUrls: ['./dolce-vetrina-info-dialog.component.css']
})
export class DolceVetrinaInfoDialogComponent implements OnInit {
  
  dolceVendita: IDolceVenditaVetrina;

  constructor(public dialogRef: MatDialogRef<DolceVetrinaInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DolceVetrinaInfoModel) {
    this.dolceVendita = data.dolceVendita;
  }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

export class DolceVetrinaInfoModel {

  constructor(public dolceVendita: any) {
  }
}
