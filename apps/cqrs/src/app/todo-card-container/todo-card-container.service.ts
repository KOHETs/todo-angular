import { Injectable } from '@angular/core';
import { Todo, TodoService } from '@todo/data-access-todo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoCardContainerService {
  #todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private todoService: TodoService) {}

  loadTodos() {
    this.todoService.listTodos().subscribe((todos) => {
      this.#todos$.next(todos);
    });
  }

  addTodo(name: string) {
    this.todoService.createTodo(name).subscribe((todo) => {
      const todos = [...this.#todos$.value, todo];
      this.#todos$.next(todos);
    });
  }

  completionChanged(updateTodo: Todo) {
    this.todoService.updateTodo(updateTodo).subscribe((todo) => {
      const todos = this.#todos$.value.map((t) =>
        todo.id === t.id ? todo : t
      );

      this.#todos$.next(todos);
    });
  }

  clearTodos(ids: Todo['id'][]) {
    this.todoService.deleteCompletedTodos(ids).subscribe((ids) => {
      const todos = this.#todos$.value.filter((todo) => !ids.includes(todo.id));

      this.#todos$.next(todos);
    });
  }

  get todos$() {
    return this.#todos$.asObservable();
  }
}
