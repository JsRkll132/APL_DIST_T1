package com.prodsw.prodsw.models;

import java.util.List;

import javax.swing.event.MenuKeyEvent;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Data
@Table(name = "raciones")
public class Racion {
    @Id
   @SequenceGenerator(name = "racion_seq", initialValue = 600000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "racion_seq")
    @Column(name = "id_racion")
    private Long idRacion;

    @Column(name="tipo_racion")
    private String tipoRacion;

    @ManyToOne
    @JoinColumn(name = "id_menu")
    private Menu menu;

    @ManyToOne
    @JoinColumn(name = "id_plato")
    private Plato plato;

    @ManyToOne
    @JoinColumn(name = "id_turno")
    private Turno turno;

    @Column(name="estado_racion")
    private Boolean disponible;

    @OneToOne(mappedBy = "racion")
    @JsonBackReference
    private Reserva reservas;
    // Constructor sin argumentos para JPA
    public Racion() {}

    public Racion(Menu menu) {
        this.menu = menu;
        this.disponible = true;
    }

    public Racion(Menu menu, boolean disponible ){
        this.menu = menu;
        this.disponible = disponible;
    }
    
    public Racion(String tipoRacion,Plato plato,Turno turno, Boolean disponible ){
        this.plato = plato;
        this.turno = turno;
        this.tipoRacion= tipoRacion;
        this.disponible = disponible;
    }
}
