package com.example.crudspring.dto.mapper;

import org.springframework.stereotype.Component;

import com.example.crudspring.dto.CursosDTO;
import com.example.crudspring.models.Cursos;

@Component
public class CursoMapper {
    public CursosDTO toDTO(Cursos cursos) {
        if(cursos == null) {
            return null;
        }
        return new CursosDTO(cursos.getId(), cursos.getNome(), cursos.getCategoria());

    }

    public Cursos toEntity(CursosDTO cursosDTO) {
        Cursos cursos = new Cursos();

        if (cursosDTO == null) {
            return null;
        }

    if (cursosDTO._id() != null) {
        cursos.setId(cursosDTO._id());
        }
        cursos.setNome(cursosDTO.nome());
        cursos.setCategoria(cursosDTO.categoria());
        return cursos;
    }
}
