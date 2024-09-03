package com.prodsw.prodsw.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@Entity
@Table(name = "USERS")
public class User implements UserDetails {
    @Id
    @Column(name = "ID_Usuario")
    private String idUsuario;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password",length = 512)
    private String password;

    @Column(name = "user_type")
    private String userType;

    
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
        name="user_role",
        joinColumns = {@JoinColumn(name="ID_Usuario")},
        inverseJoinColumns = {@JoinColumn(name="roleid")}
    )
    private Set<Role> authorities;


    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
    @JsonManagedReference
    private Set<Alumno> alumnos;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch=FetchType.EAGER)
    private Set<Administrador> administradors;   
    
    public Set<Alumno> getAlumnos(){
        return this.alumnos;
    }
    public User() {
		super();
		authorities = new HashSet<>();
	}
	
    public User(String idUsuario, String username, String password, String userType, Set<Role> authorities) {
        super();
        this.idUsuario=idUsuario;
        this.username=username;
        this.password=password;
        this.userType=userType;
        this.authorities=authorities;
    }
    public User(String idUsuario, String username, String password, String userType, Set<Role> authorities,Set<Alumno>  alumnos) {
        super();
        this.idUsuario=idUsuario;
        this.username=username;
        this.password=password;
        this.userType=userType;
        this.authorities=authorities;
        this.alumnos = alumnos;
    }    
    public User(String idUsuario, String username, String password, String userType, Set<Role> authorities,Set<Alumno>  alumnos,Set<Administrador> administradors) {
        super();
        this.idUsuario=idUsuario;
        this.username=username;
        this.password=password;
        this.userType=userType;
        this.authorities=authorities;
        this.alumnos = alumnos;
        this.administradors = administradors;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Set<Role> authorities) {
        this.authorities = authorities;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
