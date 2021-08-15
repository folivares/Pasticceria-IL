package it.test.pasticceriail.model;

import java.math.BigDecimal;

public class DolceVenditaFresco extends DolceVendita {

    @Override
    public BigDecimal getPrezzoVendita() {
        // prezzo pieno
        return this.dolce.getDolceVetrina().getPrezzoBase();   
    }
    
}
