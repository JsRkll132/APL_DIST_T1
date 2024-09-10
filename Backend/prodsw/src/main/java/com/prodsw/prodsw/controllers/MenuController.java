package com.prodsw.prodsw.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prodsw.prodsw.models.Menu;
import com.prodsw.prodsw.models.Plato;
import com.prodsw.prodsw.models.DTOs.MenuDTO;
import com.prodsw.prodsw.services.MenuService;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("api/v1/menus")
@CrossOrigin("*")
public class MenuController {
    @Autowired
    MenuService menuService;

    @PostMapping("/createMenu")
    public Menu createMenu(@RequestBody MenuDTO menuDTO){
        return this.menuService.createMenu(menuDTO.getNombreMenu());
    }
    @PostMapping("/AddPlatos")
    public Menu AddPlatos(@RequestBody MenuDTO menuDTO){
        return this.menuService.AddPlatos(menuDTO.getIdMenu(),menuDTO.getIdPlato());
    }

    @PostMapping("/DeletePlatos")
    public Menu DeletePlatos(@RequestBody MenuDTO menuDTO){
        return this.menuService.DeletePlatos(menuDTO.getIdMenu(),menuDTO.getIdPlato());
    }

    @PostMapping("/AddTurnos")
    public Menu AddTurnos(@RequestBody MenuDTO menuDTO){
        return this.menuService.AddTurnos(menuDTO.getIdMenu(),menuDTO.getIdTurno());
    }

    @PostMapping("/DeleteTurnos")
    public Menu DeleteTurnos(@RequestBody MenuDTO menuDTO){
        return this.menuService.DeleteTurnos(menuDTO.getIdMenu(),menuDTO.getIdTurno());
    }

    @GetMapping("/getAll")
    public List<Menu> getAll(){
        return this.menuService.getAll();
    }
}
