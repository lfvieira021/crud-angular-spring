import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cursos } from '../models/cursos';
import { CursosService } from '../services/cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolver implements Resolve<Cursos> {
  constructor(private cursoService: CursosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cursos> {
    if (route.params && route.params['id']) {
      return this.cursoService.loadById(route.params['id'])
    }
    return of({ _id: '', nome: '', categoria: '' });
  }
}
