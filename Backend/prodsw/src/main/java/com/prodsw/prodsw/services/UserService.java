package com.prodsw.prodsw.services;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.prodsw.prodsw.models.Alumno;
import com.prodsw.prodsw.models.Role;
import com.prodsw.prodsw.models.User;
import com.prodsw.prodsw.repository.AlumnoRepository;
import com.prodsw.prodsw.repository.UserRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired AlumnoRepository alumnoRepository;
    /* 
    @SuppressWarnings("null")
    public void CreateUser(User user){
        
        userRepository.save(user);
    }

    @SuppressWarnings("null")
    public User GetById(String id){
        Optional<User> response = userRepository.findById(id);
        if(response.isPresent()){
            return response.get();
        }else{
            return new User();
        }
       
    }*/
    /* 
    public User loginUser(String username,String password){
        return userRepository.findByUsernameAndPassword(username, password);
    }*/
    public List<User> GetAll(){
        return userRepository.findAll();
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Error in username..."));
       
    }

    
    public UserDetails LoadUserByUsernameAndPassword(String username,String password){
        System.out.println("User details service..");
        return userRepository.findByUsernameAndPassword(username, passwordEncoder.encode(password)).get();
        //.orElseThrow(() -> new UsernameNotFoundException("Bad credentials.."));
    }
    @Transactional
    public User setAlumnos(String nombre1,String nombre2,String apellido1,String apellido2,String CorreoPersonal,String userid){
        User user = userRepository.findByIdUsuario(userid).get();
        Alumno alumno = new Alumno(nombre1, nombre2, apellido1, apellido2, CorreoPersonal,user);
        alumnoRepository.save(alumno);
        return user;
    }

    @SuppressWarnings("null")
    public User findById(String id){
        return userRepository.findById(id).get();
    }
    
}
