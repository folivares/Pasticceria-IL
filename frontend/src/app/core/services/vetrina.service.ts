import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/rest-utils';
import { IDolceVenditaVetrina } from '../models/dolce-vendita-vetrina.model';
import { IDolce } from '../models/dolce.model';
import { IFormAddVetrina } from '../models/form-add-vetrina';

@Injectable({
    providedIn: "root"
})
export class VetrinaService {

    constructor(private http: HttpClient) { }

    /**
     * Richiede dolci da mostrare in vetrina
     * 
     * @returns dolci vetrina
     */
    getAllDolciVetrina(): Promise<IDolceVenditaVetrina[]> {
        return new Promise<IDolceVenditaVetrina[]>(
            (resolve, reject) => {
                this.http.get(API_URL.VETRINA, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

    /**
     * Richiede l'aggiunta di un dolce in vetrina con i relativi attributi
     * 
     * @param idDolce dolce da aggiungere in vetrina
     * @param formAddVetrina quantita e prezzo base
     * @returns dolce vetrina aggiunto
     */
    addDolceToVetrina(idDolce: number, formAddVetrina: IFormAddVetrina): Promise<IDolce> {
        return new Promise<IDolce>(
            (resolve, reject) => {
                this.http.post(`${API_URL.VETRINA_DOLCE}/${idDolce}`, formAddVetrina, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

    /**
     * Richiede la rimozione di un dolce dalla vetrina
     * 
     * @param idDolce 
     * @returns 
     */
    deleteDolceFromVetrina(idDolce: number): Promise<IDolce> {
        return new Promise<IDolce>(
            (resolve, reject) => {
                this.http.delete(`${API_URL.VETRINA_DOLCE}/${idDolce}`, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

}
