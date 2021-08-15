package it.test.pasticceriail.service;

import java.util.List;

import it.test.pasticceriail.domain.Ingrediente;
import it.test.pasticceriail.exception.IdNotFoundEx;
import it.test.pasticceriail.exception.IngredienteHasDolciEx;

/**
 * 
 * Interfaccia per la gestione delle operazioni CRUD
 * su Ingrediente
 * 
 */
public interface CRUDIngredienteInterface {
    
    /**
     * Recupera lista ingredienti
     * 
     * @return lista ingredienti
     */
    List<Ingrediente> getAllIngredienti();

    /**
     * Recupera ingrediente a paritre da id specifico
     * 
     * @param id ingrediente
     * @return ingrediente
     * @throws IdNotFoundEx
     */
    Ingrediente getIngredienteById(long id) throws IdNotFoundEx;

    /**
     * Crea ingrediente
     * 
     * @param ingredienteToCreate
     * @return ingrediente appena creato con nuovo id assegnato
     */
    Ingrediente createIngrediente(Ingrediente ingredienteToCreate);

    /**
     * Aggiorna proprietà di un ingrediente specifico
     * 
     * @param id ingrediente
     * @param ingredienteToUpdate
     * @return ingrediente aggiornato
     * @throws IdNotFoundEx
     */
    Ingrediente updateIngrediente(long id, Ingrediente ingredienteToUpdate) throws IdNotFoundEx;

    /**
     * Rimuovi ingrediente specifico
     * 
     * @param id ingrediente
     * @return
     * @throws IdNotFoundEx
     * @throws IngredienteHasDolciEx
     */
    boolean deleteIngrediente(long id) throws IdNotFoundEx, IngredienteHasDolciEx;

}
