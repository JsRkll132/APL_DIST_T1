package com.prodsw.prodsw.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.prodsw.prodsw.models.Alumno;
import com.prodsw.prodsw.models.DTOs.AlumnoDTO;
import com.prodsw.prodsw.services.AlumnoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("api/v1/alumnos")
@CrossOrigin("*")
public class AlumnoController {
    @Autowired
    AlumnoService alumnoService;
    @PostMapping("/register")
    public Alumno postMethodName(@RequestBody AlumnoDTO alumnoDTO) {
        
        return alumnoService.CreateAlumno(alumnoDTO.getAlumnoNombre(), alumnoDTO.getAlumnoNombre2(), alumnoDTO.getAlumnoApellido1(), alumnoDTO.getAlumnoApellido2(), 
        alumnoDTO.getAlumnoCorreoPersonal(),alumnoDTO.getUserId());
    }

    @GetMapping("/getByIdUser/{id}")
    public Alumno findByIdUsuario(@PathVariable String id) {
        return alumnoService.findByIdUsuario(id);
    }

    @GetMapping("/getAll")
    public List<Alumno> getAll() {
        return alumnoService.GetAll();
    }
    
    
}
