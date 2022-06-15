import { Component } from '@angular/core';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos: { name: string; completed: boolean }[] = [];

  addTodo(name: string) {
    this.todos.push({ name, completed: false });
  }

  completionChanged(todo: { name: string; completed: boolean }) {
    console.log(todo);
    this.todos = this.todos
      .filter((t) => t.name)
      .map((t) =>
        t.name === todo.name ? { ...t, completed: !t.completed } : t
      );
  }

  clearCompleted() {
    this.todos = this.todos.filter((t) => !t.completed);
  }
}
