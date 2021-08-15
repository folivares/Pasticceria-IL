package it.test.pasticceriail.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@AllArgsConstructor @NoArgsConstructor
@EqualsAndHashCode
public class IngredienteDolcePK implements Serializable {

    @Column(name = "id_ingrediente")
    @Getter @Setter
    private long idIngrediente;

    @Column(name = "id_dolce")
    @Getter @Setter
    private long idDolce;
    
}
