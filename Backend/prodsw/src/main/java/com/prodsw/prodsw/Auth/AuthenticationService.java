package com.prodsw.prodsw.Auth;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.prodsw.prodsw.models.Alumno;
import com.prodsw.prodsw.models.Role;
import com.prodsw.prodsw.models.User;
import com.prodsw.prodsw.models.DTOs.LoginResponseDTO;
import com.prodsw.prodsw.models.DTOs.RegisterV2DTO;
import com.prodsw.prodsw.repository.AlumnoRepository;
import com.prodsw.prodsw.repository.RoleRepository;
import com.prodsw.prodsw.repository.UserRepository;
import com.prodsw.prodsw.services.TokenService;


@Service
@Transactional
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AlumnoRepository alumnoRepository; 
    @Autowired
    private TokenService tokenService;
    
    public User registerUser(String username, String password){
       // System.out.println("THIS IS THE ERROR ************************************************************");
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole= roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);
        Integer randnum = 100000+(int)(Math.random()*9999);
        return userRepository.save(new User(String.valueOf(randnum),username,
        encodedPassword,String.valueOf(userRole.getRoleId()),authorities));
    }
    public Alumno registerUserV2(RegisterV2DTO body){
        String encodedPassword = passwordEncoder.encode(body.getPassword());
        Role userRole = roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);
        Integer randnum = 100000+(int)(Math.random()*9999);
        User newuser = new User(String.valueOf(randnum),body.getUsername(),
        encodedPassword,String.valueOf(userRole.getRoleId()),authorities);
        userRepository.save(newuser);
        return alumnoRepository.save(new Alumno(body.getAlumnoNombre(), body.getAlumnoNombre2(),
        body.getAlumnoApellido1(), body.getAlumnoApellido2(), body.getAlumnoCorreoPersonal(),userRepository.findByIdUsuario(newuser.getIdUsuario()).get()));
        

     }
 
    public LoginResponseDTO loginUser(String username, String password){
    
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );
            String token = tokenService.generateJwt(auth);
            return new LoginResponseDTO(userRepository.findByUsername(username).get(),token);
       
        
    }

}
