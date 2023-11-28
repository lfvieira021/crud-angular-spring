import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Cursos } from '../models/cursos';
import { tap, first, delay } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  public readonly Api = 'api/cursos'

  // listar cursos
  listar() {
    return this.http.get<Cursos[]>(this.Api).pipe(
      first(),
      delay(1300),
      tap(cursos => console.log(cursos))
    )
  }

  // buscar pelo id do curso
  loadById(id: string) {
    return this.http.get<Cursos>(`${this.Api}/${id}`)
  }

  // salvar curso
  salvar(record: Cursos) {
    if (record._id) {
      return this.update(record)
    }
    return this.criar(record)

  }

  // criar novo curso
  private criar(record: Cursos) {
    return this.http.post<Cursos>(this.Api, record)
  }

  // atualizar curso
  private update(record: Cursos) {
    return this.http.put<Cursos>(`${this.Api}/${record._id}`, record)
  }

  remover(id: string) {
    return this.http.delete(`${this.Api}/${id}`)
  }
  constructor(private http: HttpClient) { }
}
