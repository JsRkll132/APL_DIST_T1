package com.prodsw.prodsw.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prodsw.prodsw.models.Alumno;
import com.prodsw.prodsw.models.Menu;
import com.prodsw.prodsw.models.Racion;
import com.prodsw.prodsw.models.Reserva;
import com.prodsw.prodsw.repository.AlumnoRepository;
import com.prodsw.prodsw.repository.MenuRepository;
import com.prodsw.prodsw.repository.RacionRepository;
import com.prodsw.prodsw.repository.ReservaRepository;

@Service
public class ReservaService {
    @Autowired
    ReservaRepository reservaRepository;
    @Autowired
    AlumnoRepository alumnoRepository;
    @Autowired
    RacionRepository racionRepository;
    @Autowired
    MenuRepository menuRepository;

    

    @SuppressWarnings("null")
    public Reserva createReserva(Long idalumno,Long idracion) throws Exception{
        Racion changeEstado = racionRepository.findById(idracion).get();

        Boolean verified = false;
        Menu addedMenu = menuRepository.findByNombreMenu(changeEstado.getTipoRacion()).get();
        try{
            for (var i : alumnoRepository.findById(idalumno).get().getReservas() ){
                verified = i.getMenu().getIdMenu().equals(addedMenu.getIdMenu()); 
                if (verified == true){
                    break;
                }
            }
            if (!verified){
                changeEstado.setDisponible(false);
                racionRepository.save(changeEstado);
                Reserva reserva  = new Reserva(alumnoRepository.findById(idalumno).get(), changeEstado);
                reserva.setMenu(menuRepository.findByNombreMenu(changeEstado.getTipoRacion()).get());
                return reservaRepository.save(reserva);   
            }
        }catch(Exception e){
            throw new Exception(e);
        }
        return null;


    }

    public String DeletedReserva(Long idReserva,Long idAlumno){
        Reserva todeletedReserva = this.reservaRepository.findById(idReserva).get();
        Racion racion = todeletedReserva.getRacion();
        racion.setDisponible(true);
        racionRepository.save(racion);
        Alumno alumno = this.alumnoRepository.findById(idAlumno).get();
        alumno.getReservas().remove(todeletedReserva);
        this.alumnoRepository.save(alumno);
        this.reservaRepository.delete(todeletedReserva);

        return "Deleted reserva : "+todeletedReserva.getIdReserva().toString()+" ,from Alumno : "+alumno.getId().toString();
    }

    public List<Reserva> getAll(){
        return reservaRepository.findAll();
    }
}
