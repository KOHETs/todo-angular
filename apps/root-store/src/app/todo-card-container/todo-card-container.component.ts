import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Todo } from '@todo/data-access-todo';
import { TodoActions } from '../+state/todo.actions';
import { State } from '../+state/todo.reducer';
import { getAllTodo } from '../+state/todo.selectors';

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
  todos$ = this.store.pipe(select(getAllTodo));

  constructor(private readonly store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(TodoActions.load());
  }

  addTodo(name: string) {
    this.store.dispatch(TodoActions.create({ name }));
  }

  completionChanged(todo: Todo) {
    this.store.dispatch(TodoActions.update({ todo }));
  }

  clearTodos(todoIds: Todo['id'][]) {
    this.store.dispatch(TodoActions.deleteMany({ todoIds }));
  }
}
