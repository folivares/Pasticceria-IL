package it.test.pasticceriail.model;

import java.math.BigDecimal;

import it.test.pasticceriail.domain.Dolce;
import lombok.Getter;
import lombok.Setter;

/**
 * 
 * Classe per la rappresentazione di un dolce in vetrina
 * Contiene oggetto Dolce e prezzo vendita
 * 
 */
public abstract class DolceVendita {

    @Getter
    @Setter
    protected Dolce dolce;

    protected BigDecimal prezzoVendita;

    public abstract BigDecimal getPrezzoVendita();  

}
