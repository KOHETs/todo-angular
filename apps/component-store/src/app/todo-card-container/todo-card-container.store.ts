import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Todo, TodoService } from '@todo/data-access-todo';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

export interface TodoCardContainerState {
  todos: Todo[];
  loading: boolean;
  loaded: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
}

@Injectable()
export class TodoCardContainerStore extends ComponentStore<TodoCardContainerState> {
  constructor(private todoService: TodoService) {
    super({
      todos: [],
      loading: false,
      loaded: false,
      creating: false,
      updating: false,
      deleting: false,
    });
  }

  readonly todos$ = this.select((state) => state.todos);

  readonly loadTodos = this.effect((void$) => {
    return void$.pipe(
      tap(() => this.patchState({ loading: true, loaded: false })),
      switchMap(() =>
        this.todoService.listTodos().pipe(
          tapResponse(
            (todos) => this.patchState({ todos, loading: false, loaded: true }),
            catchError(() => EMPTY)
          )
        )
      )
    );
  });

  readonly addTodo = this.effect<string>((name$) => {
    return name$.pipe(
      tap(() => this.patchState({ creating: true })),
      switchMap((name) =>
        this.todoService.createTodo(name).pipe(
          tapResponse(
            (todo) =>
              this.patchState(({ todos }) => ({
                todos: [...todos, todo],
                creating: false,
              })),
            catchError(() => EMPTY)
          )
        )
      )
    );
  });

  readonly completionChanged = this.effect<Todo>((todo$) => {
    return todo$.pipe(
      tap(() => this.patchState({ updating: true })),
      switchMap((todo) =>
        this.todoService.updateTodo(todo).pipe(
          tapResponse(
            (todo) =>
              this.patchState(({ todos }) => ({
                todos: todos.map((t) => (t.id === todo.id ? todo : t)),
                updating: false,
              })),
            catchError(() => EMPTY)
          )
        )
      )
    );
  });

  readonly clearTodos = this.effect<Todo['id'][]>((todoIds$) => {
    return todoIds$.pipe(
      tap(() => this.patchState({ deleting: true })),
      switchMap((todoIds) =>
        this.todoService.deleteCompletedTodos(todoIds).pipe(
          tapResponse(
            () =>
              this.patchState(({ todos }) => ({
                todos: todos.filter(({ id }) => !todoIds.includes(id)),
                deleting: false,
              })),
            catchError(() => EMPTY)
          )
        )
      )
    );
  });
}
