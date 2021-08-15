package it.test.pasticceriail.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dolce")
@AllArgsConstructor @NoArgsConstructor
public class Dolce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private long id;

    @Getter
    @Setter
    private String nome;

    @Getter
    @Setter
    @OneToMany(mappedBy = "dolce", cascade = CascadeType.ALL)
    Set<IngredienteDolce> ingredientiDolce;

    @Getter
    @Setter
    @OneToOne(mappedBy = "dolce", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private DolceVetrina dolceVetrina;

}