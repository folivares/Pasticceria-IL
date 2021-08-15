package it.test.pasticceriail.domain;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dolce_vetrina")
@AllArgsConstructor @NoArgsConstructor
@Builder
public class DolceVetrina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private long id;

    @Getter
    @Setter
    private int qta;

    @Getter
    @Setter
    @Column(name = "prezzo_base")
    private BigDecimal prezzoBase;

    @Getter
    @Setter
    @Temporal(TemporalType.DATE)
    private Date data;

    @Getter
    @Setter
    @JsonIgnore
    @OneToOne(optional = false, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "id_dolce")
    private Dolce dolce;

}