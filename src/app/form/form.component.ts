import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../todo/todo';
import { User } from '../todo/user';
import { TodoService } from '../todo/todo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public todo: Todo = new Todo();
  public errores: string[];

  constructor(private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.todo.user = new User();
     }

  ngOnInit(): void {
    this.loadTODO();
  }
  loadTODO(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.todoService.getTODO(id).subscribe((todo) => this.todo = todo)
      }
    });
  }
  create(): void {
    this.todoService.create(this.todo).subscribe(
      todo => {
        this.router.navigate(['/todos'])
        Swal.fire('TODO New', `Task ${this.todo.title} has been created successfully!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    )
  }
  update(): void {
    this.todoService.update(this.todo).subscribe(cliente => {
      this.router.navigate(['/todos'])
      Swal.fire('TODO Updated', `Task ${this.todo.title} has been updated successfully!`, 'success')
    },
      err => {
        this.errores = err.error.errors as string[];

      })
  }
}
