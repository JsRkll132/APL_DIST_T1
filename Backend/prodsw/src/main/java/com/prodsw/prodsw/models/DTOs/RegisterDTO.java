package com.prodsw.prodsw.models.DTOs;

import lombok.Data;

@Data
public class RegisterDTO {
    private String username;
    private String password;
    public RegisterDTO(){
        super();
    }
    @Override
    public String toString(){
        return "Register information : username: "+this.getUsername()+" password: "+this.getPassword();
    }
}
