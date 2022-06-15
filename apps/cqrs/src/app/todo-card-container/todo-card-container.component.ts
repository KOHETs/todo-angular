import { Component, OnInit } from '@angular/core';
import { Todo } from '@todo/data-access-todo';
import { TodoCardContainerService } from './todo-card-container.service';

@Component({
  selector: 'todo-todo-card-container',
  template: `<ui-todo-card
    [todos]="(todos$ | async)!"
    (addTodo)="addTodo($event)"
    (completionChanged)="completionChanged($event)"
    (clearTodos)="clearTodos($event)"
  ></ui-todo-card>`,
  styles: [],
})
export class TodoCardContainerComponent implements OnInit {
  todos$ = this.todoCardContainerService.todos$;

  constructor(
    private readonly todoCardContainerService: TodoCardContainerService
  ) {}

  ngOnInit() {
    this.todoCardContainerService.loadTodos();
  }

  addTodo(name: string) {
    this.todoCardContainerService.addTodo(name);
  }

  completionChanged(todo: Todo) {
    this.todoCardContainerService.completionChanged(todo);
  }

  clearTodos(ids: Todo['id'][]) {
    this.todoCardContainerService.clearTodos(ids);
  }
}
