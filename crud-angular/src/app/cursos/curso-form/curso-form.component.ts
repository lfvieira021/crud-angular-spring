import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CursosService } from '../services/cursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Cursos } from '../models/cursos';
@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css'],
})
export class CursoFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      nome: ['', [Validators.required, Validators.minLength(5)]],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const cursos: Cursos = this.route.snapshot.data['curso'];
    this.form.setValue({
      _id: cursos._id,
      nome: cursos.nome,
      categoria: cursos.categoria,
    });
  }

  enviar() {
    this.cursosService.salvar(this.form.value).subscribe(
      (resposta) => this.sucesso(),
      (error) => this.tratarErro(error)
    );
  }

  cancelar() {
    this.location.back();
  }

  sucesso() {
    this._snackBar.open('Curso salvo com sucessso!', 'Fechar', {
      duration: 3000,
    });
    this.cancelar();
  }

  tratarErro(error: any) {
    this._snackBar.open(error.error.message, 'Fechar', { duration: 3000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatorio';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`;
    }

    return 'Campo invalido';
  }
}
