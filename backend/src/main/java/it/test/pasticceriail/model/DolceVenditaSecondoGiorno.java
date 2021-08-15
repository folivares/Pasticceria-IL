package it.test.pasticceriail.model;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class DolceVenditaSecondoGiorno extends DolceVendita {

    @Override
    public BigDecimal getPrezzoVendita() {
        // sconto del 20%
        return this.dolce.getDolceVetrina().getPrezzoBase().multiply(new BigDecimal(0.8)).setScale(2,
                RoundingMode.CEILING);
    }

}
