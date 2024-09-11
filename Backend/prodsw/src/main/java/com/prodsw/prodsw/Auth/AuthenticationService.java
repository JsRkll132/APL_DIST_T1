package com.prodsw.prodsw.Auth;

import java.util.HashSet;
import java.util.Set;
import java.util.Optional;

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
        private String generateNextUserId() {
        // Obtener el ID máximo actual
        Optional<String> maxIdOpt = userRepository.findMaxId();
        
        if (maxIdOpt.isPresent()) {
            String maxId = maxIdOpt.get();
            System.out.println(maxId);
            // Obtener la parte numérica del ID (ignorando la 'U' inicial)
            if (maxId.length()>1){
                int numberPart = Integer.parseInt(maxId.substring(1));
            // Incrementar el número
                String nextId = "U" + String.format("%06d", numberPart + 1);
                return nextId;
            }
            return "U100001";
        } else {
            // Si no hay usuarios, empezamos con el primer ID
            return "U100001";
        }
    }
    public User registerUser(String username, String password){
       // System.out.println("THIS IS THE ERROR ************************************************************");
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole= roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);
        String newUserId = generateNextUserId();
        return userRepository.save(new User(newUserId,username,encodedPassword,String.valueOf(userRole.getRoleId()),authorities));
    }
    public Alumno registerUserV2(RegisterV2DTO body){
        String encodedPassword = passwordEncoder.encode(body.getPassword());
        Role userRole = roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);
        String newUserId = generateNextUserId();
        User newuser = new User( newUserId,body.getUsername(),
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
