import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'ui-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  newTodo = '';

  @Input() todos: { name: string; completed: boolean }[] = [];

  @Output() addTodo = new EventEmitter<string>();
  @Output() completionChanged = new EventEmitter<{
    name: string;
    completed: boolean;
  }>();
  @Output() clearCompleted = new EventEmitter<void>();

  addTodoAndClearInput(name: string) {
    this.addTodo.emit(name);
    this.newTodo = '';
  }

  todoSelectionChanged($event: MatSelectionListChange) {
    $event.options.forEach((option) => {
      this.completionChanged.emit(option.value);
    });
  }
}
