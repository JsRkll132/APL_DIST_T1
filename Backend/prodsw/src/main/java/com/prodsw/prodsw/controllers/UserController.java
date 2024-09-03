package com.prodsw.prodsw.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.prodsw.prodsw.models.Alumno;
import com.prodsw.prodsw.models.User;
import com.prodsw.prodsw.models.DTOs.AlumnoDTO;
import com.prodsw.prodsw.services.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;






@RestController
@RequestMapping("api/v1/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserService userService;
    @GetMapping("/getAll")
    public List<User> GetAll(){
        return userService.GetAll();
    }
    @PostMapping("/alumnoRegister")
    public User setAlumnos(@RequestBody AlumnoDTO alumnoDTO){
        return userService.setAlumnos(alumnoDTO.getAlumnoNombre(), alumnoDTO.getAlumnoNombre2(),
         alumnoDTO.getAlumnoApellido1(),alumnoDTO.getAlumnoApellido2(), alumnoDTO.getAlumnoCorreoPersonal(), alumnoDTO.getUserId());
    }
    
    @GetMapping("/")
    public String HelloUser(){
        return "Welcome";
    }

    @GetMapping("/getUserById/{id}")
    public User findByIdUser(@PathVariable String id) {
        return userService.findById(id);
    }
    
}
