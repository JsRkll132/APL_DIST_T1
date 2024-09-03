package com.prodsw.prodsw.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
@Entity
@Data
@Table(name = "reservas")
@AllArgsConstructor
public class Reserva {
    @Id
    @SequenceGenerator(name = "reserva_seq", initialValue = 700000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reserva_seq")
    private Long idReserva;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_alumno")
    private Alumno alumno;

    @OneToOne
    @JoinColumn(name = "id_racion",unique = true)
    @JsonManagedReference
    private Racion racion;

    @ManyToOne
    @JoinColumn(name = "id_menu",unique = false)
    private Menu menu;

    @Column(name="estado_reserva")
    private boolean aceptada;

    @Column(name="fecha_reserva")
    private LocalDateTime fechaReserva;

    // Constructor sin argumentos para JPA
    public Reserva() {}

    public Reserva(Alumno alumno, Racion racion) {
        this.alumno = alumno;
        this.racion = racion;
        this.aceptada = false;
        this.fechaReserva = LocalDateTime.now();
       // this.menu = racion.getMenu();
    }
}
