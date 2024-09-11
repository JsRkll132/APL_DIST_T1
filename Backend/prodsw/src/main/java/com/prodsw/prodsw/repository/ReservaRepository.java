

package com.prodsw.prodsw.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prodsw.prodsw.models.Alumno;
import com.prodsw.prodsw.models.Racion;
import com.prodsw.prodsw.models.Reserva;
import java.util.List;



@Repository
public interface ReservaRepository extends JpaRepository<Reserva,Long>{

    Optional<Reserva> findByRacion(Racion racion);
    Optional<Reserva> findByIdReserva(Long idReserva);
   // Optional<List<Reserva>> findByAlumno(Alumno Alumno);
}