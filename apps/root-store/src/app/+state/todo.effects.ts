import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { TodoService } from '@todo/data-access-todo';
import { map } from 'rxjs';

import { TodoActions } from './todo.actions';

@Injectable()
export class TodoEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.load),
      fetch({
        run: () => {
          this.todoService.listTodos().pipe(
            map((todos) => {
              return TodoActions.loadSuccess({ todos });
            })
          );
        },
        onError: (error) => {
          console.error('Error', error);
        },
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.create),
      pessimisticUpdate({
        run: ({ name }) => {
          return this.todoService.createTodo(name).pipe(
            map((todo) => {
              return TodoActions.createSuccess({ todo });
            })
          );
        },
        onError: (error) => {
          console.error('Error', error);
        },
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.update),
      pessimisticUpdate({
        run: ({ todo }) => {
          return this.todoService.updateTodo(todo).pipe(
            map((todo) => {
              return TodoActions.updateSuccess({ todo });
            })
          );
        },
        onError: (error) => {
          console.error('Error', error);
        },
      })
    )
  );

  deleteMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteMany),
      pessimisticUpdate({
        run: ({ todoIds }) => {
          return this.todoService.deleteCompletedTodos(todoIds).pipe(
            map(() => {
              return TodoActions.deleteManySuccess({ todoIds });
            })
          );
        },
        onError: (error) => {
          console.error('Error', error);
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly todoService: TodoService
  ) {}
}
