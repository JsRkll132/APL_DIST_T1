package com.prodsw.prodsw.models;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "Alumno")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Alumno {
    @Id
    @SequenceGenerator(name = "alumno_seq", initialValue = 200000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "alumno_seq")
    @Column(name = "id_alumno")
    private Long id;

    @Column(name = "alumno_nombre")
    private String alumnoNombre;

    @Column(name = "alumno_nombre2")
    private String alumnoNombre2;

    @Column(name = "alumno_apellido1")
    private String alumnoApellido1;

    @Column(name = "alumno_apellido2")
    private String alumnoApellido2;

    @Column(name = "alumno_correo")
    private String alumnoCorreo;

    @Column(name = "alumno_correo_personal")
    private String alumnoCorreoPersonal;
    
    @ManyToOne
    @JoinColumn(name = "ID_usuario",unique = true)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "alumno",cascade = CascadeType.ALL,fetch=FetchType.LAZY)
    @JsonManagedReference
    private List<Reserva> reservas;


    public User getUser(){
        return this.user;
    }
    public Alumno(){
       
    }
    public Alumno(String alumnoNombre, String alumnoNombre2, String alumnoApellido1, String alumnoApellido2, String alumnoCorreoPersonal) {
        super(); // Llamar al constructor de la superclase User
        this.alumnoNombre = alumnoNombre;
        this.alumnoNombre2 = alumnoNombre2;
        this.alumnoApellido1 = alumnoApellido1;
        this.alumnoApellido2 = alumnoApellido2;
        this.alumnoCorreo = generateUsername(alumnoNombre2, alumnoApellido2);
        this.alumnoCorreoPersonal = alumnoCorreoPersonal;
        
    }
    public Alumno(String alumnoNombre, String alumnoNombre2, String alumnoApellido1, String alumnoApellido2, String alumnoCorreoPersonal,User user) {
        super();
        this.alumnoNombre = alumnoNombre;
        this.alumnoNombre2 = alumnoNombre2;
        this.alumnoApellido1 = alumnoApellido1;
        this.alumnoApellido2 = alumnoApellido2;
        this.alumnoCorreo = alumnoNombre.toLowerCase() + "." + alumnoApellido1.toLowerCase()+user.getIdUsuario()+"@unmsm.edu.pe";
        this.alumnoCorreoPersonal = alumnoCorreoPersonal;
        this.user=user;
    }
    // Método para generar el username
    private String generateUsername(String nombre, String apellido) {
        return nombre.toLowerCase() + "." + apellido.toLowerCase();
    }

}