package com.prodsw.prodsw.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodsw.prodsw.models.Turno;

@Repository
public interface TurnoRepository extends JpaRepository<Turno,Long>{

    
} 