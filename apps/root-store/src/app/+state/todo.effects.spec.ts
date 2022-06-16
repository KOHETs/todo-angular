import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TodoActions from './todo.actions';
import { TodoEffects } from './todo.effects';

describe('TodoEffects', () => {
  let actions: Observable<Action>;
  let effects: TodoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TodoEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TodoEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TodoActions.init() });

      const expected = hot('-a-|', {
        a: TodoActions.loadTodoSuccess({ todo: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
