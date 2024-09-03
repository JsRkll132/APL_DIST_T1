package com.prodsw.prodsw.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodsw.prodsw.models.Racion;
@Repository
public interface RacionRepository extends JpaRepository<Racion,Long> {
    
}
