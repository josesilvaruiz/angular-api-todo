import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from './todo.service';
import { tap } from 'rxjs/operators';
import { Todo } from './todo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {

  todos: Todo[];
  paginador: any;
  search: any;
  constructor(private todoService: TodoService,
    private activatedRoute: ActivatedRoute) {
    this.todos = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.todoService.getTODOs(page).pipe(
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
    Swal.fire({
      title: 'Are you sure?',
      text: "This operation cannot be undone",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.delete(todo.id).subscribe(
          () => {
            this.todos = this.todos.filter(e => e !== todo)
            Swal.fire(
              'Deleted!',
              `TODO ${todo.title} has been deleted.`,
              'success'
            )
          }
        )

      }
    });
  }
}
