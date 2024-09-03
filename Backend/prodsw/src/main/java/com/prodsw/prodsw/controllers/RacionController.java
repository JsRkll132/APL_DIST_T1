package com.prodsw.prodsw.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prodsw.prodsw.models.Racion;
import com.prodsw.prodsw.models.DTOs.RacionDTO;
import com.prodsw.prodsw.repository.MenuRepository;
import com.prodsw.prodsw.repository.PlatoRepository;
import com.prodsw.prodsw.repository.TurnoRepository;
import com.prodsw.prodsw.services.RacionService;

@RestController
@RequestMapping("api/v1/Raciones")
@CrossOrigin("*")
public class RacionController {
    @Autowired
    RacionService racionService;
    @Autowired
    PlatoRepository platoRepository;
    @Autowired
    TurnoRepository turnoRepository;
    @Autowired
    MenuRepository menuRepository;
    @SuppressWarnings("null")
    @PostMapping("/createRacion")
    public Racion createRacion(@RequestBody RacionDTO racionDTO){
        return racionService.createRacion(racionDTO.getTipoRacion(),platoRepository.findById(racionDTO.getIdPlato()).get(),turnoRepository.findById(racionDTO.getIdTurno()).get(), 
                       racionDTO.getEstadoRacion());
    }

    @GetMapping("/getAll")
    public List<Racion> getAll(){
        return racionService.getAll();
    }

    @GetMapping("/deleteRacion/{id}")
    public String deleteRacion(@PathVariable String id){
        return racionService.deleteRacion(Long.parseLong(id));
    }
}
