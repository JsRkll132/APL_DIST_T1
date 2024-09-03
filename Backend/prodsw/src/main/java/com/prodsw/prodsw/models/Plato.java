package com.prodsw.prodsw.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "platos")
public class Plato {
   @Id
    @SequenceGenerator(name = "plato_seq", initialValue = 300000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "plato_seq")
    @Column(name = "id_plato")
    private Long idPlato;

    @Column(name="nombre_plato")
    private String nombrePlato;

    @Column(name="kcal_plato")
    private Double kcalPlato;

    @Column(name="peso_plato")
    private Double pesoPlato;

    public Plato(String nombrePlato,Double kcalPlato,Double pesoPlato){
        super();
        this.nombrePlato = nombrePlato;
        this.kcalPlato = kcalPlato;
        this.pesoPlato = pesoPlato;

    }
}
