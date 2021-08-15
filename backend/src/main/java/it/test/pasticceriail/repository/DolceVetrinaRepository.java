package it.test.pasticceriail.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import it.test.pasticceriail.domain.DolceVetrina;

@Repository
public interface DolceVetrinaRepository extends JpaRepository<DolceVetrina, Long> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM dolce_vetrina WHERE id_dolce = ?1", nativeQuery = true)
    void deleteByIdDolce(Long idDolce);

}
