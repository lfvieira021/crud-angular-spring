package com.example.crudspring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.crudspring.dto.CursosDTO;
import com.example.crudspring.dto.mapper.CursoMapper;
import com.example.crudspring.exception.RecordNotFoundException;
import com.example.crudspring.models.Cursos;
import com.example.crudspring.repositorio.CursosRepositorio;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CursoService {
    private final CursosRepositorio cursosRepositorio;
    private final CursoMapper cursoMapper;

    public CursoService(CursosRepositorio cursosRepositorio, CursoMapper cursoMapper) {
        this.cursosRepositorio = cursosRepositorio;
        this.cursoMapper = cursoMapper;
    }

    public List<CursosDTO> list() {
        return cursosRepositorio.findAll()
                .stream()
                .map(cursoMapper::toDTO)
                .collect(Collectors.toList());

    }

    public CursosDTO findById(@PathVariable @NotNull @Positive Long id) {
        return cursosRepositorio.findById(id)
                .map(cursoMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CursosDTO criar(@Valid @NotNull CursosDTO cursos) {
        return cursoMapper.toDTO(cursosRepositorio.save(cursoMapper.toEntity(cursos)));
    }

    public CursosDTO update(@NotNull @Positive Long id,
            CursosDTO cursos) {
        return cursosRepositorio.findById(id)
                .map(recordFound -> {
                    recordFound.setNome(cursos.nome());
                    ;
                    recordFound.setCategoria(cursos.categoria());
                    return cursoMapper.toDTO(cursosRepositorio.save(recordFound));

                }).orElseThrow(() -> new RecordNotFoundException(id));

    }

    public void delete(@PathVariable @NotNull @Positive Long id) {
        cursosRepositorio.delete(cursosRepositorio.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));

    }
}
