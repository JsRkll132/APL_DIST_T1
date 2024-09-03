package com.prodsw.prodsw.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prodsw.prodsw.models.Plato;
import com.prodsw.prodsw.repository.PlatoRepository;

@Service
public class PlatoService {
    @Autowired
    PlatoRepository platoRepository;

    public Plato CreatePlato(String nombrePlato ,Double kcalPlato ,Double pesoPlato){
        return platoRepository.save(new Plato(nombrePlato,kcalPlato,pesoPlato));
    }
    
    public Plato editPlato(Plato plato,String nombrePlato ,Double kcalPlato ,Double pesoPlato){
        plato.setNombrePlato(nombrePlato);
        plato.setKcalPlato(kcalPlato);
        plato.setPesoPlato(pesoPlato);
        return this.platoRepository.save(plato);
    }

    public List<Plato> getAll(){
        return platoRepository.findAll();
    }
}
