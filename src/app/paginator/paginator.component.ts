import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TodoService } from '../todo/todo.service';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginador: any;

  paginas: number[];
  desde: number;
  hasta: number;
  isSearch: boolean;
  userSearched: number;
  constructor(private todoService: TodoService) { 
    this.paginas = [];
    this.desde = 0;
    this.hasta = 0;
    this.isSearch = todoService.getIsSearch();
    this.userSearched = todoService.getUserSearched();
   
  }

  ngOnInit(): void {
    this.initPaginator();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.userSearched)
    this.isSearch = this.todoService.getIsSearch();
    this.userSearched = this.todoService.getUserSearched();
    let paginadorActualizado = changes['paginador'];
    if (paginadorActualizado.previousValue) {
      this.initPaginator();
      
    }

  }
  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);

    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

    if (this.paginador.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }
}
