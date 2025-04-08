import { Component, OnInit } from '@angular/core';
import { Cursos } from '../models/cursos';
import { CursosService } from '../services/cursos.service';
import { catchError, Observable, of } from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacaoComponent } from 'src/app/shared/confirmacao/confirmacao.component';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent {
  cursos!: Observable<Cursos[]>;
  displayedColumns = ['nome', 'categoria', 'acoes']

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.refresh()
  }
  openDialog(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

  refresh() {
    this.cursos = this.cursosService.listar().pipe(
      catchError(error => {
        this.openDialog('Erro ao carregar curso')
        return of([])
      })
    )
  }

  add(): void {

    this.router.navigate(['novo'], { relativeTo: this.route })
  }

  edit(cursos: Cursos) {
    this.router.navigate(['editar', cursos._id], { relativeTo: this.route })

  }

  deletar(cursos: Cursos) {
    const dialogRef = this.dialog.open(ConfirmacaoComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.cursosService.remover(cursos._id).subscribe(() => {
          this.refresh()
          this._snackBar.open('Curso removido com sucesso!', 'Fechar', { duration: 3000 })
        },
          error => this.openDialog('Erro ao remover curso!')
        )
      }
    });  
  }
}
