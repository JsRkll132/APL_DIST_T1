package com.prodsw.prodsw.controllers;

import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prodsw.prodsw.models.Turno;
import com.prodsw.prodsw.models.DTOs.TurnoDTO;
import com.prodsw.prodsw.services.TurnoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("api/v1/turnos")
@CrossOrigin("*")
public class TurnoController {
    @Autowired
    TurnoService turnoService;
    @PostMapping("/registrarTurno")
    public Turno CreateTurno(@RequestBody TurnoDTO turnoDTO){

        LocalTime horaInicio = LocalTime.parse(turnoDTO.getHoraInicio());
        LocalTime horaFin = LocalTime.parse(turnoDTO.getHoraFin());
        return turnoService.RegisterTurno(turnoDTO.getNombreturno(),horaInicio,horaFin);
    }
    @GetMapping("/getAll")
    public List<Turno> getAll(){
       return  turnoService.getAll();
    }
    
}
