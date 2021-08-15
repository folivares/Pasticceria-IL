package it.test.pasticceriail.domain;

import java.math.BigDecimal;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ingrediente_dolce")
@AllArgsConstructor @NoArgsConstructor
@Builder
public class IngredienteDolce {

    @EmbeddedId
    @Getter @Setter
    private IngredienteDolcePK compositeId;

    @Getter @Setter
    @ManyToOne
    @MapsId("idIngrediente")
    @JoinColumn(name = "id_ingrediente")
    Ingrediente ingrediente;

    @Getter @Setter
    @JsonIgnore
    @ManyToOne
    @MapsId("idDolce")
    @JoinColumn(name = "id_dolce")
    Dolce dolce;

    @Getter
    @Setter
    private BigDecimal qta;

}