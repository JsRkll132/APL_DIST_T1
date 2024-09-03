package com.prodsw.prodsw.repository;

import com.prodsw.prodsw.models.Alumno;
import com.prodsw.prodsw.models.Menu;
import com.prodsw.prodsw.models.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface MenuRepository extends JpaRepository<Menu,Long>{

    Optional<Menu> findByNombreMenu(String nombreMenu);;
} 
