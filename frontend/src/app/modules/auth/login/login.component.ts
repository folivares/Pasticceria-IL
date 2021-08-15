import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    loading: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
        // verifico utente se già loggato
        this.loading = true;
        const user = this.authenticationService.getCurrentAuthUser();
        if (user && user.jwtToken) {
            this.router.navigate(['/backoffice']);
        } else {
            this.loading = false;
        }
    }

    ngOnInit() {
        this.titleService.setTitle('Pasticceria IL - Accesso');
        // inizializza form
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });
    }

    /**
     * Effettua processo di acesso al sistema
     */
    login() {
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        this.loading = true;
        this.authenticationService.login(email.toLowerCase(), password)
            .then((response) => {
                this.router.navigate(['/backoffice']);
                this.notificationService.openSnackBar("Benvenuto");
            })
            .catch((error) => {
                this.notificationService.openSnackBarWithDismiss(error?.error?.response || 'Si è verificato un errore');
            }).finally(() => {
                this.loading = false;
            });
    }

}
