package com.prodsw.prodsw.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prodsw.prodsw.models.Reserva;
import com.prodsw.prodsw.models.DTOs.ReservaDTO;
import com.prodsw.prodsw.services.ReservaService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("api/v1/reservas")
@CrossOrigin("*")
public class ReservaController {
    @Autowired
    ReservaService reservaService;


    @PostMapping("/createReserva")
    public Reserva creatReserva(@RequestBody ReservaDTO reservaDTO) throws Exception{

        return reservaService.createReserva(reservaDTO.getIdalumno(),reservaDTO.getIdracion());
    }

    @GetMapping("/deleteByIdReserva/{idAlumno}/{idReserva}")
    public String creatReserva(@PathVariable String idReserva,@PathVariable String idAlumno){
        return reservaService.DeletedReserva(Long.parseLong(idReserva),Long.parseLong(idAlumno));
    }

    @GetMapping("/getAll")
    public List<Reserva> getAll(){
        return reservaService.getAll();
    }
    @GetMapping("/getReservaAlumno")
    public List<Reserva> getAlumnoReservas(@RequestParam Long idAlumno) {
        return reservaService.getAlumnoReservas(idAlumno);
    }
    
}
