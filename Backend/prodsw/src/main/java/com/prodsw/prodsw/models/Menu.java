

package com.prodsw.prodsw.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "menu")
public class Menu {
    @Id
    @SequenceGenerator(name = "menu_seq", initialValue = 1100000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "menu_seq")
    @Column(name = "id_menu")
    private Long idMenu;

    @Column(name = "nombre_menu")
    private String nombreMenu;


    @ManyToMany
  //  @JoinColumn(name = "id_plato")
    private List<Plato> platos ;

    @OneToMany
  //  @JoinColumn(name = "id_turno")
    private List<Turno> turnos;

    public Menu(List<Turno> turnos,List<Plato> platos,String nombreMenu){
        this.platos = platos;
        this.nombreMenu = nombreMenu ;
        this.turnos = turnos;

    }
    public Menu(List<Turno> turnos,String nombreMenu){
        this.nombreMenu = nombreMenu ;
        this.turnos = turnos;

    }
    public Menu(String nombreMenu,List<Plato> platos){
        this.nombreMenu = nombreMenu ;
        this.platos = platos;
       

    }
    public Menu(String nombreMenu){
        this.nombreMenu = nombreMenu ;

    }
}
