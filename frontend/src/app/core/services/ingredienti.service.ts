import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/rest-utils';
import { IIngrediente } from '../models/ingrediente.model';

@Injectable({
    providedIn: "root"
})
export class IngredientiService {

    constructor(private http: HttpClient) { }

    /**
     * Recupera lista ingredienti
     * 
     * @returns lista ingredienti
     */
    getAllIngredienti(): Promise<IIngrediente[]> {
        return new Promise<IIngrediente[]>(
            (resolve, reject) => {
                this.http.get(API_URL.CRUD_INGREDIENTI, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

    /**
     * Recupera ingrediente specifico
     * 
     * @param id 
     * @returns ingrediente
     */
    getIngredienteById(id: number): Promise<IIngrediente> {
        return new Promise<IIngrediente>(
            (resolve, reject) => {
                this.http.get(`${API_URL.CRUD_INGREDIENTI}/${id}`, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

    /**
     * Richiede creazione ingrediente
     * 
     * @param ingrediente 
     * @returns ingrediente creato
     */
    addIngrediente(ingrediente: IIngrediente): Promise<IIngrediente> {
        return new Promise<IIngrediente>(
            (resolve, reject) => {
                this.http.post(API_URL.CRUD_INGREDIENTI, ingrediente, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

    /**
     * Richiede aggiornamento ingrediente
     * 
     * @param id 
     * @param ingrediente 
     * @returns ingrediente aggiornato
     */
    updateIngrediente(id: number, ingrediente: IIngrediente): Promise<IIngrediente> {
        return new Promise<IIngrediente>(
            (resolve, reject) => {
                this.http.put(`${API_URL.CRUD_INGREDIENTI}/${id}`, ingrediente, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

    /**
     * Richiede eliminazione ingrediente
     * 
     * @param id 
     * @
     */
    deleteIngrediente(id: number): Promise<IIngrediente> {
        return new Promise<IIngrediente>(
            (resolve, reject) => {
                this.http.delete(`${API_URL.CRUD_INGREDIENTI}/${id}`, { observe: 'response' })
                    .pipe(take(1))
                    .subscribe((resp: HttpResponse<any>) => {
                        resolve(resp.body.response);
                    }, (err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
    }

}
