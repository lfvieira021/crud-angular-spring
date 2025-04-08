import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cursos } from '../models/cursos';
import { tap, first, delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  public readonly Api = `${environment}/cursos`;
  
  constructor(private http: HttpClient) {}
  
  // listar cursos
  listar() {
    return this.http.get<Cursos[]>(this.Api).pipe(
      first(),
      delay(1300),
      tap((cursos) => console.log(cursos))
    );
  }

  // buscar pelo id do curso
  loadById(id: string): Observable<any> {
    return this.http.get<Cursos>(`${this.Api}/${id}`);
  }

  // salvar curso
  salvar(record: Cursos): Observable<any> {
    return this.criar(record);
  }

  // criar novo curso
  private criar(record: Cursos): Observable<any> {
    return this.http.post<Cursos>(this.Api, record);
  }

  // atualizar curso
  private update(record: Cursos): Observable<any> {
    return this.http.put<Cursos>(`${this.Api}/${record._id}`, record);
  }

  remover(id: string): Observable<any> {
    return this.http.delete(`${this.Api}/${id}`);
  }
}
