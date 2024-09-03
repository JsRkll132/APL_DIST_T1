package com.prodsw.prodsw.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Administrador")
public class Administrador {


    @Id
    @SequenceGenerator(name = "admin_seq", initialValue = 100000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_seq")
    
    private Long id;

    @Column(name = "admin_nombre")
    private String adminNombre;

    @Column(name = "admin_nombre2")
    private String adminNombre2;

    @Column(name = "admin_apellido1")
    private String adminApellido1;

    @Column(name = "admin_apellido2")
    private String adminoApellido2;

    @Column(name = "admin_correo")
    private String alumnoCorreo;

    @ManyToOne
    @JoinColumn(name="ID_usuario")
    @JsonBackReference
    private User user;
}
