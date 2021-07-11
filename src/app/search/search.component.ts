import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo/todo.service';
import { tap } from 'rxjs/operators';
import { Todo } from '../todo/todo';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  todos: Todo[];
  paginador: any;
  search: any;
  page: number;
  userSearched: number;
  constructor(private todoService: TodoService,
    private activatedRoute: ActivatedRoute) {
      this.todos = [];
      this.page = 0;
         }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page'); 
      let search: number = +params.get('search');       
      this.todoService.getSearchTODOsByUser(search, page).pipe(
        tap(response => {
          console.log('TodoComponent:');
          (response.content as Todo[]).forEach(todo => {
            console.log(todo.id);
          });
        })
      ).subscribe(
        response => {
          this.todos = response.content as Todo[]
          this.paginador = response;
        });
    });
  }
  delete(todo: Todo): void {
    this.todoService.delete(todo.id).subscribe(
      reponse => {
        this.todos = this.todos.filter(cli => cli !== todo)
        Swal.fire(
          'TODO Eliminado!',
          'TODO eliminado con exito.',
          'success'
        )
      })
  }
}
