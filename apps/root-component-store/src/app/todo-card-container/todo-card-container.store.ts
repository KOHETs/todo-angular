import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Todo, TodoService } from '@todo/data-access-todo';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { TodoActions } from '../+state/todo.actions';
import { getAllTodo } from '../+state/todo.selectors';

export interface TodoCardContainerState {
  loading: boolean;
  loaded: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
}

@Injectable()
export class TodoCardContainerStore extends ComponentStore<TodoCardContainerState> {
  constructor(private store: Store, private todoService: TodoService) {
    super({
      loading: false,
      loaded: false,
      creating: false,
      updating: false,
      deleting: false,
    });
  }

  readonly todos$ = this.select(
    this.store.select(getAllTodo),
    (todos) => todos
  );

  readonly loadTodos = this.effect((void$) => {
    return void$.pipe(
      tap(() => this.patchState({ loading: true, loaded: false })),
      switchMap(() =>
        this.todoService.listTodos().pipe(
          tapResponse(
            (todos) => {
              this.patchState({ loading: false, loaded: true });
              this.store.dispatch(TodoActions.loadSuccess({ todos }));
            },
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
            (todo) => {
              this.patchState({
                creating: false,
              });
              this.store.dispatch(TodoActions.createSuccess({ todo }));
            },
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
            (todo) => {
              this.patchState({
                updating: false,
              });
              this.store.dispatch(TodoActions.updateSuccess({ todo }));
            },
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
            () => {
              this.patchState({
                deleting: false,
              });
              this.store.dispatch(TodoActions.deleteManySuccess({ todoIds }));
            },
            catchError(() => EMPTY)
          )
        )
      )
    );
  });
}
