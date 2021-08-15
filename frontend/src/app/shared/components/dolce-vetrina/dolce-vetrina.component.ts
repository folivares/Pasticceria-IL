import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDolceVenditaVetrina } from 'src/app/core/models/dolce-vendita-vetrina.model';
import { DolceVetrinaInfoDialogComponent } from '../dolce-vetrina-info-dialog/dolce-vetrina-info-dialog.component';

/**
 * Component Dolce Vetrina
 * 
 * Widget visualizzazione info e dettagli dolce vetrina
 */
@Component({
    selector: 'app-dolce-vetrina',
    templateUrl: './dolce-vetrina.component.html',
    styleUrls: ['./dolce-vetrina.component.css']
})
export class DolceVetrinaComponent {

    @Input() dolceVendita: IDolceVenditaVetrina;

    constructor(
        private dialog: MatDialog
    ) {
    }

    getInfoDolceVetrina() {
        this.dialog.open(DolceVetrinaInfoDialogComponent, {
            data: {
                dolceVendita: this.dolceVendita
            }
        });
    }

}
