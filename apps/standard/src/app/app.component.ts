import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '@todo/data-access-todo';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
