import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DataAccessTodoModule } from '@todo/data-access-todo';
import { UiTodoModule } from '@todo/ui-todo';
import { environment } from '../environments/environment';
import { TodoEffects } from './+state/todo.effects';
import * as fromTodo from './+state/todo.reducer';
import { AppComponent } from './app.component';
import { TodoCardContainerComponent } from './todo-card-container/todo-card-container.component';

@NgModule({
  declarations: [AppComponent, TodoCardContainerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromTodo.TODO_FEATURE_KEY, fromTodo.reducer),
    EffectsModule.forFeature([TodoEffects]),
    UiTodoModule,
    DataAccessTodoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
