package it.test.pasticceriail.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import it.test.pasticceriail.domain.Dolce;

@Repository
public interface DolceRepository extends JpaRepository<Dolce, Long> {

    List<Dolce> findByOrderByNomeAsc();

    Optional<Dolce> findById(long id);

    /**
     * Cerca dolci per la vendita
     * Requisiti:
     * - data di messa in vendita max 2 giorni da data corrente
     * - quantità maggiore di 0
     * 
     * @param progressReportId
     * @return
     */
    @Query(value = "SELECT * FROM dolce d INNER JOIN dolce_vetrina dv ON dv.id_dolce = d.id WHERE dv.data >= (CURDATE() - INTERVAL 2 DAY) AND dv.qta > 0 ORDER BY dv.data DESC, d.nome", nativeQuery = true)
    List<Dolce> findDolciForVendita();
    
}
