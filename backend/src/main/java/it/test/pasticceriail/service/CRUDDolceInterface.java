package it.test.pasticceriail.service;

import java.util.List;

import it.test.pasticceriail.domain.Dolce;
import it.test.pasticceriail.exception.IdNotFoundEx;

/**
 * 
 * Interfaccia per la gestione delle operazioni CRUD
 * su Dolce
 * 
 */
public interface CRUDDolceInterface {
    
    /**
     * Recupera lista dolci
     * 
     * @return lista dolci
     */
    List<Dolce> getAllDolci();

    /**
     * Recupera dolce a partire da id specifico
     * 
     * @param id dolce
     * @return dolce
     * @throws IdNotFoundEx
     */
    Dolce getDolceById(long id) throws IdNotFoundEx;

    /**
     * Crea dolce
     * 
     * @param dolceToCreate
     * @return dolce appena creato con nuovo id assegnato
     */
    Dolce createDolce(Dolce dolceToCreate);

    /**
     * Aggiorna proprietà di un dolce specifico
     * 
     * @param id dolce
     * @param dolceToUpdate
     * @return dolce aggiornato
     * @throws IdNotFoundEx
     */
    Dolce updateDolce(long id, Dolce dolceToUpdate) throws IdNotFoundEx;

    /**
     * Rimuove dolce specifico
     * 
     * @param id dolce
     * @return
     */
    boolean deleteDolce(long id);

}
