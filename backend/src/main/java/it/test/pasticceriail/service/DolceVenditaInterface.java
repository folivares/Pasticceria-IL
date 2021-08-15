package it.test.pasticceriail.service;
import it.test.pasticceriail.domain.Dolce;
import it.test.pasticceriail.model.DolceVendita;

@FunctionalInterface
public interface DolceVenditaInterface {

    DolceVendita creaDolceVendita(Dolce dolce);

}
