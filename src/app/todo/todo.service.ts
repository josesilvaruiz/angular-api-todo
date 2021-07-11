import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Todo } from './todo';
import Swal from 'sweetalert2';

@Injectable()
export class TodoService {
  private userSearched: number;
  private isSearch: boolean;
  private urlEndPoint: string = 'http://localhost:8080/api/todos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient, private router: Router) { }

  getUserSearched() {
    return this.userSearched;
  }
getIsSearch() {
  return this.isSearch;
}
  getTODOs(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe
      (tap((response: any) => {
        this.isSearch = false;
          console.log('tap');
          (response.content as Todo[]).forEach(todo => {
            console.log("Userid: " + todo.user.id,"Todoid: " +  todo.id,"Title: " +  todo.title,"Completed?: " + todo.completed);
          })
        })
      );
  }
  getSearchTODOsByUser(search: number, page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/search/${search}/page/${page}`).pipe
    (tap((response: any) => {
      this.userSearched = search;
      this.isSearch = true;
        console.log('tap');
        (response.content as Todo[]).forEach(todo => {
          console.log("Userid: " + todo.user.id,"Todoid: " +  todo.id,"Title: " +  todo.title,"Completed?: " + todo.completed);
        })
      })
    );
}
  getTODO(id: any): Observable<Todo>{
    return this.http.get<Todo>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['todos']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }
  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.urlEndPoint, todo, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire('Error al crear el TODO', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }
  update(todo: Todo): Observable<Todo>{
    return this.http.put<Todo>(`${this.urlEndPoint}/${todo.id}`, todo, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        Swal.fire('Error al editar el TODO', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Todo>{
    return this.http.delete<Todo>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire('Error al borrar el cliente', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }
}
