import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { first, switchMap, catchError, take, tap, map } from 'rxjs/operators';
import { IDolce } from '../models/dolce.model';
import { API_URL } from 'src/app/shared/rest-utils';

@Injectable({
    providedIn: "root"
})
export class DolciService {

    constructor(private http: HttpClient) { }

    /**
     * Recupera lista dolci
     * 
     * @returns lista dolci
     */
    getAllDolci(): Promise<IDolce[]> {
        return new Promise<IDolce[]>(
            (resolve, reject) => {
                this.http.get(API_URL.CRUD_DOLCI, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

    /**
     * Recupera dolce specifico
     * 
     * @param id 
     * @returns dolce
     */
    getDolceById(id: number): Promise<IDolce> {
        return new Promise<IDolce>(
            (resolve, reject) => {
                this.http.get(`${API_URL.CRUD_DOLCI}/${id}`, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {

                        reject(err);
                    });
            });
    }

    /**
     * Richiede creazione dolce
     * 
     * @param dolce 
     * @returns dolce creato
     */
    addDolce(dolce: IDolce): Promise<IDolce> {
        return new Promise<IDolce>(
            (resolve, reject) => {
                this.http.post(API_URL.CRUD_DOLCI, dolce, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

    /**
     * Richiede aggiornamento dolce
     * 
     * @param id 
     * @param dolce 
     * @returns dolce aggiornato
     */
    updateDolce(id: number, dolce: IDolce): Promise<IDolce> {
        return new Promise<IDolce>(
            (resolve, reject) => {
                this.http.put(`${API_URL.CRUD_DOLCI}/${id}`, dolce, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

    /**
     * Richiede rimozione dolce
     * 
     * @param id 
     * @returns 
     */
    deleteDolce(id: number): Promise<IDolce> {
        return new Promise<IDolce>(
            (resolve, reject) => {
                this.http.delete(`${API_URL.CRUD_DOLCI}/${id}`, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

}
