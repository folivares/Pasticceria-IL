package it.test.pasticceriail.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.test.pasticceriail.domain.Ingrediente;
import it.test.pasticceriail.exception.IdNotFoundEx;
import it.test.pasticceriail.exception.IngredienteHasDolciEx;
import it.test.pasticceriail.repository.DolceRepository;
import it.test.pasticceriail.repository.IngredienteDolceRepository;
import it.test.pasticceriail.repository.IngredienteRepository;
import it.test.pasticceriail.service.CRUDIngredienteInterface;

@Service
public class IngredienteService implements CRUDIngredienteInterface {

    @Autowired
    DolceRepository dolceRepository;
    @Autowired
    IngredienteRepository ingredienteRepository;
    @Autowired
    IngredienteDolceRepository ingredienteDolceRepository;

    @Override
    public List<Ingrediente> getAllIngredienti() {
        return ingredienteRepository.findByOrderByNomeAsc();
    }

    @Override
    public Ingrediente getIngredienteById(long id) throws IdNotFoundEx {
        Optional<Ingrediente> ingrediente = ingredienteRepository.findById(id);
        if (ingrediente.isPresent()) {
            return ingrediente.get();
        } else {
            throw new IdNotFoundEx();
        }
    }

    @Override
    public Ingrediente createIngrediente(Ingrediente ingredienteToCreate) {
        Ingrediente ingrediente = Ingrediente.builder().nome(ingredienteToCreate.getNome())
                .um(ingredienteToCreate.getUm()).build();
        ingredienteRepository.saveAndFlush(ingrediente);
        return ingrediente;
    }

    @Override
    public Ingrediente updateIngrediente(long id, Ingrediente ingredienteToUpdate) throws IdNotFoundEx {
        Optional<Ingrediente> ingrediente = ingredienteRepository.findById(id);
        if (ingrediente.isPresent()) {
            ingrediente.get().setNome(ingredienteToUpdate.getNome());
            ingrediente.get().setUm(ingredienteToUpdate.getUm());
            ingredienteRepository.saveAndFlush(ingrediente.get());
            return ingrediente.get();
        } else {
            throw new IdNotFoundEx();
        }
    }

    @Override
    public boolean deleteIngrediente(long id) throws IdNotFoundEx, IngredienteHasDolciEx {
        Optional<Ingrediente> ingrediente = ingredienteRepository.findById(id);
        if (ingrediente.isPresent()) {
            if (ingrediente.get().getIngredientiDolce().size() > 0) {
                throw new IngredienteHasDolciEx();
            }
            ingredienteRepository.delete(ingrediente.get());
            return true;
        } else {
            throw new IdNotFoundEx();
        }
    }

}
