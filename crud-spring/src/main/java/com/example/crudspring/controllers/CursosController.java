package com.example.crudspring.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.crudspring.dto.CursosDTO;
import com.example.crudspring.service.CursoService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/cursos")
public class CursosController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public @ResponseBody List<CursosDTO> list() {
        return cursoService.list();
    }

    @GetMapping("/{id}")
    public CursosDTO findById(@PathVariable @NotNull @Positive Long id) {
        return cursoService.findById(id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CursosDTO criar(@RequestBody @Valid CursosDTO cursos) throws Exception {
        return cursoService.criar(cursos);
    }

    @PutMapping("/{id}")
    public CursosDTO update(@PathVariable @NotNull @Positive Long id,
                            @RequestBody CursosDTO cursos) {
        return cursoService.update(id, cursos);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {

        cursoService.delete(id);
    }

}
