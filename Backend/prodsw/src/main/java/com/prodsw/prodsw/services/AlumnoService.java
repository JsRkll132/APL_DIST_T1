package com.prodsw.prodsw.services;


import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.prodsw.prodsw.models.Alumno;
import com.prodsw.prodsw.models.User;
import com.prodsw.prodsw.repository.AlumnoRepository;
import com.prodsw.prodsw.repository.UserRepository;

@Service
@Transactional
public class AlumnoService {
    @Autowired
    AlumnoRepository alumnoRepository;
    @Autowired
    UserRepository userRepository;
    public Alumno CreateAlumno(String nombre1,String nombre2,String apellido1,String apellido2,String CorreoPersonal,String userid){
        Alumno alumno = new Alumno(nombre1,nombre2,apellido1,apellido2,
        CorreoPersonal,userRepository.findByIdUsuario(userid).get());
        //HashSet<Alumno> alumnoset = new HashSet<>();
        //alumnoset.add(alumno); 
       // User existuser = userRepository.findByIdUsuario(userid).get();
        //existuser.setAlumnos(alumnoset);
        //userRepository.save(existuser); 
        alumnoRepository.save(alumno);
        return alumno;
    }
    public List<Alumno> GetAll(){
        return alumnoRepository.findAll();
    }
    @SuppressWarnings("null")
    public Alumno findByidAlumno(Long id){
        return alumnoRepository.findById(id).get();
    }
    @SuppressWarnings("null")
    public Alumno findByIdUsuario(String iduser) {
        return alumnoRepository.findByUser(userRepository.findById(iduser).get()).get();
    }
    
}
