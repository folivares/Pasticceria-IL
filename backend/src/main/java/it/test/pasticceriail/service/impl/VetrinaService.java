package it.test.pasticceriail.service.impl;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.test.pasticceriail.domain.Dolce;
import it.test.pasticceriail.domain.DolceVetrina;
import it.test.pasticceriail.dto.FormDolceVetrinaDTO;
import it.test.pasticceriail.exception.IdNotFoundEx;
import it.test.pasticceriail.model.DolceVendita;
import it.test.pasticceriail.model.DolceVenditaFactory;
import it.test.pasticceriail.repository.DolceRepository;
import it.test.pasticceriail.repository.DolceVetrinaRepository;
import it.test.pasticceriail.service.VetrinaInterface;
import it.test.pasticceriail.service.DolceVenditaInterface;

@Service
public class VetrinaService implements VetrinaInterface, DolceVenditaInterface {

    @Autowired
    DolceRepository dolceRepository;
    @Autowired
    DolceVetrinaRepository dolceVetrinaRepository;

    @Override
    public List<DolceVendita> findDolciForVendita() {
        List<Dolce> dolci = dolceRepository.findDolciForVendita();
        List<DolceVendita> dolciVendita = dolci.stream().map(d -> creaDolceVendita(d)).collect(Collectors.toList());
        return dolciVendita;
    }

    @Transactional
    @Override
    public Dolce addDolceToVetrina(long idDolce, FormDolceVetrinaDTO formDolceVetrinaDTO) throws IdNotFoundEx {
        // rimuovi vecchia messa in vendita se presente
        dolceVetrinaRepository.deleteByIdDolce(idDolce);
        // recupera dolce
        Optional<Dolce> dolce = dolceRepository.findById(idDolce);
        if (dolce.isPresent()) {
            // aggiungi nuova messa in vendita
            DolceVetrina dolceVetrina = DolceVetrina.builder().dolce(dolce.get()).qta(formDolceVetrinaDTO.getQta())
                    .prezzoBase(formDolceVetrinaDTO.getPrezzoBase()).data(new Date()).build();
            dolce.get().setDolceVetrina(dolceVetrina);
            dolceRepository.saveAndFlush(dolce.get());
            return dolce.get();
        } else {
            throw new IdNotFoundEx();
        }
    }

    @Override
    public boolean deleteDolceFromVetrina(long idDolce) {
        dolceVetrinaRepository.deleteByIdDolce(idDolce);
        return true;
    }

    @Override
    public DolceVendita creaDolceVendita(Dolce dolce) {
        // differenza giorni tra data messa in vendita e oggi
        long giorniFromVendita = ChronoUnit.DAYS.between(
            Instant.ofEpochMilli(dolce.getDolceVetrina().getData().getTime())
                .atZone(ZoneId.systemDefault()).toLocalDateTime(), 
            LocalDate.now().atStartOfDay());
        // creazione dolce sulla base dei giorni dalla messa in vendita
        DolceVenditaFactory dolceVenditaFactory = new DolceVenditaFactory();
        DolceVendita dolceVendita = dolceVenditaFactory.getByGiorniVendita(giorniFromVendita);
        dolceVendita.setDolce(dolce);
        return dolceVendita;
    }

}
