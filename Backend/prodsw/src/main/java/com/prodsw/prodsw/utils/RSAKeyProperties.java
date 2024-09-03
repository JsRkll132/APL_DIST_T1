package com.prodsw.prodsw.utils;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class RSAKeyProperties {
    
    private RSAPublicKey publicKey;
    private RSAPrivateKey privateKey;

    public RSAKeyProperties (){
        KeyPair pair = KeyGeneratorUtility.generateRsaKey();
        this.publicKey = (RSAPublicKey) pair.getPublic();
        this.privateKey = (RSAPrivateKey) pair.getPrivate();
    }
    
}
