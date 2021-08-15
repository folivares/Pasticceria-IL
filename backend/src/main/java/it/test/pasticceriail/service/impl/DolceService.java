package it.test.pasticceriail.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.test.pasticceriail.domain.Dolce;
import it.test.pasticceriail.domain.Ingrediente;
import it.test.pasticceriail.domain.IngredienteDolce;
import it.test.pasticceriail.domain.IngredienteDolcePK;
import it.test.pasticceriail.exception.IdNotFoundEx;
import it.test.pasticceriail.repository.DolceRepository;
import it.test.pasticceriail.repository.IngredienteDolceRepository;
import it.test.pasticceriail.repository.IngredienteRepository;
import it.test.pasticceriail.service.CRUDDolceInterface;
import it.test.pasticceriail.service.IngredienteDolceInterface;

@Service
public class DolceService implements CRUDDolceInterface, IngredienteDolceInterface {

    @Autowired
    DolceRepository dolceRepository;
    @Autowired
    IngredienteRepository ingredienteRepository;
    @Autowired
    IngredienteDolceRepository ingredienteDolceRepository;

    @Override
    public List<Dolce> getAllDolci() {
        return dolceRepository.findByOrderByNomeAsc();
    }

    @Override
    public Dolce getDolceById(long id) throws IdNotFoundEx {
        Optional<Dolce> dolce = dolceRepository.findById(id);
        if (dolce.isPresent()) {
           return dolce.get();
        } else {
            throw new IdNotFoundEx();
        }
    }

    @Transactional
    @Override
    public Dolce createDolce(Dolce dolceToCreate) {
        // insert dolce
        Dolce dolce = new Dolce();
        dolce.setNome(dolceToCreate.getNome());
        dolceRepository.saveAndFlush(dolce);
        // recupero ingredienti
        Set<IngredienteDolce> listIngredientiDolce = this.createIngredienteDolceRelationship(dolce,
                dolceToCreate.getIngredientiDolce());
        // update dolce con ingredienti
        dolce.setIngredientiDolce(listIngredientiDolce);
        dolceRepository.saveAndFlush(dolce);
        return dolce;
    }

    @Transactional
    @Override
    public Dolce updateDolce(long idDolce, Dolce dolceToUpdate) throws IdNotFoundEx {
        Optional<Dolce> dolce = dolceRepository.findById(idDolce);
        if (dolce.isPresent()) {
            dolce.get().setNome(dolceToUpdate.getNome());
            dolce.get().getIngredientiDolce().clear();
            // rimuovo ingredienti
            ingredienteDolceRepository.deleteByIdDolce(dolce.get().getId());
            // recupero ingredienti
            Set<IngredienteDolce> listIngredientiDolce = this.createIngredienteDolceRelationship(dolce.get(),
                    dolceToUpdate.getIngredientiDolce());
            // update dolce con ingredienti
            dolce.get().setIngredientiDolce(listIngredientiDolce);
            dolceRepository.saveAndFlush(dolce.get());
            return dolce.get();
        } else {
            throw new IdNotFoundEx();
        }
    }

    @Override
    public boolean deleteDolce(long id) {
        dolceRepository.deleteById(id);
        return true;
    }

    @Override
    public Set<IngredienteDolce> createIngredienteDolceRelationship(Dolce dolce, Set<IngredienteDolce> ingredientiDolce) {
        return ingredientiDolce.stream().map(i -> {
            return IngredienteDolce.builder()
            .compositeId(new IngredienteDolcePK(i.getIngrediente().getId(), dolce.getId()))
            .qta(i.getQta())
            .dolce(dolce)
            .ingrediente(Ingrediente.builder().id(i.getIngrediente().getId()).build()).build();
        }).collect(Collectors.toSet());
    }

}
