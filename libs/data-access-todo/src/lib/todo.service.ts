import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Todo } from './todo.model';

let uniqueIdIndicator = 0;

@Injectable()
export class TodoService {
  #todos$ = new BehaviorSubject<Todo[]>([]);

  listTodos() {
    return this.#todos$.asObservable().pipe(take(1));
  }

  createTodo(name: string) {
    const newTodo: Todo = {
      id: `todo-${uniqueIdIndicator++}`,
      name,
      completed: false,
    };

    const todos = [...this.#todos$.value, newTodo];
    this.#todos$.next(todos);

    return of(newTodo);
  }

  updateTodo(todo: Todo) {
    const todos = [...this.#todos$.value, todo];
    this.#todos$.next(todos);

    return of(todo);
  }

  deleteCompletedTodos(ids: Todo['id'][]) {
    const todos = this.#todos$.value.filter((todo) => !ids.includes(todo.id));

    this.#todos$.next(todos);

    return of(ids);
  }
}
