package com.prodsw.prodsw.models.DTOs;

import lombok.Data;

@Data
public class RegisterV2DTO {
    private String alumnoNombre;
    private String alumnoNombre2;
    private String alumnoApellido1;
    private String alumnoApellido2;
    private String alumnoCorreoPersonal;
    private String username;
    private String password;
    @Override
    public String toString(){
        return "Register information : username: "+this.getUsername()+" password: "+this.getPassword();
    }
}
