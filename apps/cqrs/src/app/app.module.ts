import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataAccessTodoModule } from '@todo/data-access-todo';
import { UiTodoModule } from '@todo/ui-todo';
import { AppComponent } from './app.component';
import { TodoCardContainerComponent } from './todo-card-container/todo-card-container.component';

@NgModule({
  declarations: [AppComponent, TodoCardContainerComponent],
  imports: [
    BrowserModule,
    UiTodoModule,
    BrowserAnimationsModule,
    DataAccessTodoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
