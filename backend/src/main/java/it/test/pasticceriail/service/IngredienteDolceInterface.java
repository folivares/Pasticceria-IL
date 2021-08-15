package it.test.pasticceriail.service;

import java.util.Set;

import it.test.pasticceriail.domain.Dolce;
import it.test.pasticceriail.domain.IngredienteDolce;

@FunctionalInterface
public interface IngredienteDolceInterface {

    Set<IngredienteDolce> createIngredienteDolceRelationship(Dolce dolce, Set<IngredienteDolce> ingredientiDolce);

}
