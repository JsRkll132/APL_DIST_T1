package com.prodsw.prodsw.models.DTOs;

import lombok.Data;

@Data
public class RacionDTO {
    Long idMenu;
    Long idPlato;
    Long idTurno;
    String tipoRacion;
    Boolean estadoRacion;
}
