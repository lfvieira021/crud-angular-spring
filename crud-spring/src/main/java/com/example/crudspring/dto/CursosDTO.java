package com.example.crudspring.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record CursosDTO(
        Long _id,
        @NotNull @NotBlank @Length(min = 5, max = 100) String nome,
        @NotNull @Pattern(regexp = "Back-end|Front-end") String categoria) {


}
