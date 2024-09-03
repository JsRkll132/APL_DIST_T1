package com.prodsw.prodsw.services;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prodsw.prodsw.models.Turno;
import com.prodsw.prodsw.repository.TurnoRepository;

@Service
public class TurnoService {
    @Autowired
    TurnoRepository turnoRepository;

    public Turno RegisterTurno(String nombreTurno, LocalTime horaInicio,LocalTime horaFin){
        return turnoRepository.save(new Turno(nombreTurno, horaInicio, horaFin));
    }
    public List<Turno> getAll(){
        return turnoRepository.findAll();
    }
}
