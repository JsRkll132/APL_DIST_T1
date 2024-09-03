package com.prodsw.prodsw.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prodsw.prodsw.models.Menu;
import com.prodsw.prodsw.models.Plato;
import com.prodsw.prodsw.models.Racion;
import com.prodsw.prodsw.models.Turno;
import com.prodsw.prodsw.repository.MenuRepository;
import com.prodsw.prodsw.repository.PlatoRepository;
import com.prodsw.prodsw.repository.RacionRepository;
import com.prodsw.prodsw.repository.TurnoRepository;

@Service
public class RacionService {
    @Autowired
    RacionRepository racionRepository;
    @Autowired 
    PlatoRepository platoRepository;
    @Autowired
    TurnoRepository turnoRepository;
    @Autowired
    MenuRepository menuRepository;

    public Racion createRacion (String tipoRacion,Plato plato,Turno turno, Boolean estado){
        return racionRepository.save(new Racion(tipoRacion,plato,turno,estado));
    }
    public List<Racion> getAll(){
        return racionRepository.findAll();
    }

    public String deleteRacion(Long id){
        racionRepository.deleteById(id);
        return "Deleted racion with id : "+id.toString();
    }
}
