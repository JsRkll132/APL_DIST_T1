

package com.prodsw.prodsw.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodsw.prodsw.models.Administrador;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador,Long>{
    
} 