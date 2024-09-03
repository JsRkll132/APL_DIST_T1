package com.prodsw.prodsw.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import com.prodsw.prodsw.models.Menu;
import com.prodsw.prodsw.models.Plato;
import com.prodsw.prodsw.models.Racion;
import com.prodsw.prodsw.models.Turno;
import com.prodsw.prodsw.repository.MenuRepository;
import com.prodsw.prodsw.repository.PlatoRepository;
import com.prodsw.prodsw.repository.ReservaRepository;
import com.prodsw.prodsw.repository.TurnoRepository;

@Service
public class MenuService {
    @Autowired
    MenuRepository menuRepository;
    @Autowired
    PlatoRepository platoRepository;
    @Autowired
    TurnoRepository turnoRepository;
    public Menu createMenu (String nombreMenu){
        List<Turno> turnos = new ArrayList<>();
        List<Plato> platos = new ArrayList<>();
        return menuRepository.save(new Menu(turnos,platos,nombreMenu));
    }
    public Menu AddPlatos(Long idMenu,Long idPlato){
        Menu menu = this.menuRepository.findById(idMenu).get();
        menu.getPlatos().add(platoRepository.findById(idPlato).get());
        return this.menuRepository.save(menu);
    }
    public Menu DeletePlatos(Long idMenu,Long idPlato){
        Menu menu = this.menuRepository.findById(idMenu).get();
        menu.getPlatos().remove(platoRepository.findById(idPlato).get());
        return this.menuRepository.save(menu);
    }
    public Menu AddTurnos(Long idMenu,Long idTurno){
        Menu menu = this.menuRepository.findById(idMenu).get();
        menu.getTurnos().add(turnoRepository.findById(idTurno).get());
        return this.menuRepository.save(menu);
    }
    public Menu DeleteTurnos(Long idMenu,Long idTurno){
        Menu menu = this.menuRepository.findById(idMenu).get();
        menu.getTurnos().remove(turnoRepository.findById(idTurno).get());
        return this.menuRepository.save(menu);
    }
    public List<Menu> getAll(){
        return this.menuRepository.findAll();
    }
    
}
