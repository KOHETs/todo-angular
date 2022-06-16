import { Component, OnInit } from '@angular/core';
import { Todo } from '@todo/data-access-todo';
import { TodoCardContainerStore } from './todo-card-container.store';

@Component({
  selector: 'todo-todo-card-container',
  template: `<ui-todo-card
    [todos]="(todos$ | async)!"
    (addTodo)="addTodo($event)"
    (completionChanged)="completionChanged($event)"
    (clearTodos)="clearTodos($event)"
  ></ui-todo-card>`,
  styles: [],
  providers: [TodoCardContainerStore],
})
export class TodoCardContainerComponent implements OnInit {
  todos$ = this.todoCardContainerStore.todos$;

  constructor(
    private readonly todoCardContainerStore: TodoCardContainerStore
  ) {}

  ngOnInit() {
    this.todoCardContainerStore.loadTodos();
  }

  addTodo(name: string) {
    this.todoCardContainerStore.addTodo(name);
  }

  completionChanged(todo: Todo) {
    this.todoCardContainerStore.completionChanged(todo);
  }

  clearTodos(ids: Todo['id'][]) {
    this.todoCardContainerStore.clearTodos(ids);
  }
}
