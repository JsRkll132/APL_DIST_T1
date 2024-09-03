package com.prodsw.prodsw.models;

import java.time.LocalTime;

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

@Entity
@Data
@Table(name = "turnos")
@AllArgsConstructor
@NoArgsConstructor
public class Turno {
    @Id
    @SequenceGenerator(name = "turno_seq", initialValue = 500000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "turno_seq")
    private Long idTurno;

    @Column(name="turno_nombre")
    private String nombreTurno;

    @Column(name="turno_inicio")
    private LocalTime horaInicio;

    @Column(name="turno_fin")
    private LocalTime horaFin;
    public Turno(String nombreTurno, LocalTime horaInicio,LocalTime horaFin){
        super();
        this.nombreTurno = nombreTurno;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }
}
