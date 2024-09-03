package com.prodsw.prodsw.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prodsw.prodsw.models.Plato;
import com.prodsw.prodsw.models.DTOs.PlatoDTO;
import com.prodsw.prodsw.repository.PlatoRepository;
import com.prodsw.prodsw.services.PlatoService;

@RestController
@RequestMapping("api/v1/platos")
@CrossOrigin("*")
public class PlatoController {
    @Autowired
    PlatoService platoService;
    @Autowired
    PlatoRepository platoRepository;
    @PostMapping("/createPlato")
    public Plato CreatePlato(@RequestBody PlatoDTO platoDTO){
        return platoService.CreatePlato(platoDTO.getNomnreplato(), platoDTO.getKcalPlato(), platoDTO.getPesoPlato());
    }

    @GetMapping("/getAll")
    public List<Plato> getAll(){
        return platoService.getAll();
    }

    @SuppressWarnings("null")
    @PostMapping("/editPlato")
    public Plato  editPlato(@RequestBody PlatoDTO platoDTO){
        return platoService.editPlato(platoRepository.findById(platoDTO.getIdPlato()).get(), platoDTO.getNomnreplato(),platoDTO.getKcalPlato(), platoDTO.getPesoPlato());
    }
}
