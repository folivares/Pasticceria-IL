package it.test.pasticceriail.model;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class DolceVenditaTerzoGiorno extends DolceVendita {

    @Override
    public BigDecimal getPrezzoVendita() {
        // sconto dell'80%
        return this.dolce.getDolceVetrina().getPrezzoBase().multiply(new BigDecimal(0.2)).setScale(2,
                RoundingMode.CEILING);
    }

}
