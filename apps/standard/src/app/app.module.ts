import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiTodoModule } from '@todo/ui-todo';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, UiTodoModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
