import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * 
 * Servizio di notifica tramite snackbar centralizzato
 * 
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    public openSnackBar(message: string) {
        this.snackBar.open(message, '', {
            duration: 5000
        });
    }

    public openSnackBarWithDismiss(message: string) {
        this.snackBar.open(message, 'CHIUDI', {
        });
    }

}
