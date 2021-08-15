package it.test.pasticceriail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.test.pasticceriail.domain.IngredienteDolce;
import it.test.pasticceriail.domain.IngredienteDolcePK;

@Repository
public interface IngredienteDolceRepository extends JpaRepository<IngredienteDolce, IngredienteDolcePK> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ingrediente_dolce WHERE id_dolce = ?1", nativeQuery = true)
    void deleteByIdDolce(Long idDolce);
   
}
