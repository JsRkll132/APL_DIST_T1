package com.prodsw.prodsw.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodsw.prodsw.models.Plato;

@Repository
public interface PlatoRepository extends JpaRepository<Plato,Long> {
    
}
