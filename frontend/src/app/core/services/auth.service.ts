import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/rest-utils';
import { IUtente } from '../models/utente.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    /**
     * Login
     * Richiama REST API per richiedere token
     * 
     * @param email 
     * @param password 
     * @returns 
     */
    login(email: string, password: string): Promise<string> {
        return new Promise<string>(
            (resolve, reject) => {
                const userLoginData = {
                    username: email,
                    password
                }
                this.http.post(API_URL.LOGIN, userLoginData, { observe: 'response' })
                    .pipe(tap())
                    .subscribe(
                        (resp: HttpResponse<any>) => {
                            if (resp?.body) {
                                this.setCurrentAuthUser(resp?.body.response as IUtente);
                            }
                            resolve(resp.body.code);
                        }, (error: HttpErrorResponse) => {
                            reject(error);
                        });
            });
    }

    /**
     * Pulisci localStorage per rimuovere token utente
     */
    logout(): void {
        this.localStorage.removeItem('currentAuthUser');
    }

    /**
     * Recupera dati utente da localStorage
     * 
     * @returns 
     */
    getCurrentAuthUser(): any {
        return JSON.parse(this.localStorage.getItem('currentAuthUser'));
    }

    /**
     * Salva in localStorage i dati dell'utente
     * 
     * @param utente 
     */
    setCurrentAuthUser(response: IUtente) {
        this.localStorage.setItem('currentAuthUser', JSON.stringify({
            jwtToken: response.jwtToken,
            username: response.username,
            nome: response.nome,
            cognome: response.cognome,
            ruolo: response.ruolo
        }));
    }

}
