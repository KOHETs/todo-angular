import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '@todo/data-access-todo';

@Component({
  selector: 'todo-todo-card-container',
  template: `<ui-todo-card
    [todos]="todos"
    (addTodo)="addTodo($event)"
    (completionChanged)="completionChanged($event)"
    (clearTodos)="clearTodos($event)"
  ></ui-todo-card>`,
  styles: [],
})
export class TodoCardContainerComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.todoService.listTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo(name: string) {
    this.todoService.createTodo(name).subscribe((todo) => {
      this.todos.push(todo);
    });
  }

  completionChanged(updateTodo: Todo) {
    this.todoService.updateTodo(updateTodo).subscribe((todo) => {
      this.todos = this.todos.map((t) => {
        if (todo.id === t.id) {
          return todo;
        }
        return t;
      });
    });
  }

  clearTodos(ids: Todo['id'][]) {
    this.todoService.deleteCompletedTodos(ids).subscribe((ids) => {
      this.todos = this.todos.filter((todo) => !ids.includes(todo.id));
    });
  }
}
