package com.example.crudspring.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.crudspring.models.Cursos;

@Repository
public interface CursosRepositorio extends JpaRepository<Cursos, Long> {
    Cursos findByNome(String nome);

}
