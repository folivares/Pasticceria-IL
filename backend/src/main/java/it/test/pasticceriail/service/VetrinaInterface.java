package it.test.pasticceriail.service;

import java.util.List;

import it.test.pasticceriail.domain.Dolce;
import it.test.pasticceriail.dto.FormDolceVetrinaDTO;
import it.test.pasticceriail.exception.IdNotFoundEx;
import it.test.pasticceriail.model.DolceVendita;

/**
 * 
 * Interfaccia per la gestione della vetrina
 * Operazioni relative a recupero dei dolci e al
 * relativo inserimento in vetrina
 * 
 */
public interface VetrinaInterface {

    /**
     * Recupero di tutti i dolci attualmente in vetrina
     * 
     * @return lista dolci
     */
    List<DolceVendita> findDolciForVendita();

    /**
     * 
     * Aggiunta dolce in vetrina, se già presente
     * lo sostituisce
     * 
     * @param idDolce
     * @param formDolceVetrinaDTO
     * @return dolce
     * @throws IdNotFoundEx
     */
    Dolce addDolceToVetrina(long idDolce, FormDolceVetrinaDTO formDolceVetrinaDTO) throws IdNotFoundEx;

    /**
     * Rimuove dolce da vetrina
     * 
     * @param idDolce
     * @return
     */
    boolean deleteDolceFromVetrina(long idDolce);

}
