import { Action } from '@ngrx/store';
import { Todo } from '@todo/data-access-todo';
import * as TodoActions from './todo.actions';
import { initialState, reducer, State } from './todo.reducer';

describe('Todo Reducer', () => {
  const createTodo = (id: string, name = ''): Todo => ({
    id,
    name: name || `name-${id}`,
    completed: false,
  });

  describe('valid Todo actions', () => {
    it('loadTodoSuccess should return the list of known Todo', () => {
      const todo = [createTodo('PRODUCT-AAA'), createTodo('PRODUCT-zzz')];
      const action = TodoActions.loadTodoSuccess({ todo });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
