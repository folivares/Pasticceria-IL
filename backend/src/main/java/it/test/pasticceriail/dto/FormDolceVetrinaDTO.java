package it.test.pasticceriail.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 
 * DTO per la gestione dei dati ricevuti dal client
 * per la messa in vendita di un determinato dolce
 * 
 */
@NoArgsConstructor
public class FormDolceVetrinaDTO {

    @Getter
    @Setter
    private long idDolce;
    
    @Getter
    @Setter
    private int qta;

    @Getter
    @Setter
    private BigDecimal prezzoBase;

}
