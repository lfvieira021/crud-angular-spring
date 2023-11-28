package com.example.crudspring.exception;

public class RecordNotFoundException extends RuntimeException{

    public RecordNotFoundException(Long id) {
        super("Curso nao encontrado com o id : " + id);
    }
    
}
