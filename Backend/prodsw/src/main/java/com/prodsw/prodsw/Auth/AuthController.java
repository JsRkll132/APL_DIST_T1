package com.prodsw.prodsw.Auth;

import org.springframework.web.bind.annotation.RestController;

import com.prodsw.prodsw.models.User;
import com.prodsw.prodsw.models.DTOs.LoginResponseDTO;
import com.prodsw.prodsw.models.DTOs.RegisterDTO;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterDTO body){
        return authenticationService.registerUser(body.getUsername(),body.getPassword());
    }
    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody RegisterDTO login) {
        return authenticationService.loginUser(login.getUsername(),login.getPassword());
    }
    
}
