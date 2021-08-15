package it.test.pasticceriail.model;

/**
 * 
 * Factory class per la creazione di un oggetto di tipo
 * DolceVendita a partire dal numero di giorni da quando
 * un determinato dolce è stato messo in vendita
 * 
 */
public class DolceVenditaFactory {

    public DolceVendita getByGiorniVendita(long giorniVendita) {
        if (giorniVendita == 0) { // messo in vendita oggi
            return new DolceVenditaFresco();
        } else if (giorniVendita == 1) { // secondo giorno dalla messa in vendita
            return new DolceVenditaSecondoGiorno();
        } else if (giorniVendita == 2) { // terzo giorno dalla messa in vendita
            return new DolceVenditaTerzoGiorno();
        }
        return null;
    }

}
