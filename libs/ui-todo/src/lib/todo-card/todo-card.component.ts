import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Todo } from '@todo/data-access-todo';

@Component({
  selector: 'ui-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  newTodo: Todo['name'] = '';

  @Input() todos: Todo[] = [];

  @Output() addTodo = new EventEmitter<Todo['name']>();
  @Output() completionChanged = new EventEmitter<Todo>();
  @Output() clearTodos = new EventEmitter<Todo['id'][]>();

  addTodoAndClearInput(name: Todo['name']) {
    this.addTodo.emit(name);
    this.newTodo = '';
  }

  clearCompleted() {
    const ids = this.todos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);

    this.clearTodos.emit(ids);
  }

  todoSelectionChanged($event: MatSelectionListChange) {
    $event.options.forEach((option) => {
      const updatedTodo: Todo = { ...option.value, completed: option.selected };

      this.completionChanged.emit(updatedTodo);
    });
  }
}
