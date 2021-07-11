import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// Http 

import { HttpClientModule } from '@angular/common/http';

//Routing

import { RouterModule, Routes } from '@angular/router';

// Forms 

import { FormsModule } from '@angular/forms';

//Components

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { TodoService } from './todo/todo.service';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: '', redirectTo: 'todos', pathMatch:'full'},
  {path: 'todos', component: TodoComponent},
  {path: 'todos/page/:page', component: TodoComponent},
  {path: 'form', component: FormComponent},
  {path: 'form/:id', component: FormComponent},
  {path: 'todos/search/:search/page/:page', component: SearchComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HeaderComponent,
    FormComponent,
    PaginatorComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
