package com.prodsw.prodsw.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodsw.prodsw.models.Alumno;
import com.prodsw.prodsw.models.User;

import java.util.List;
import com.prodsw.prodsw.models.Reserva;



@Repository
public interface AlumnoRepository  extends JpaRepository<Alumno,Long>{

    Optional<Alumno> findByUser(User user);
    
}
