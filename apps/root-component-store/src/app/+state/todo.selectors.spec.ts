import { Todo } from '@todo/data-access-todo';
import { initialState, todoAdapter, TodoPartialState } from './todo.reducer';
import * as TodoSelectors from './todo.selectors';

describe('Todo Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTodoId = (it: Todo) => it.id;
  const createTodo = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Todo);

  let state: TodoPartialState;

  beforeEach(() => {
    state = {
      todo: todoAdapter.setAll(
        [
          createTodo('PRODUCT-AAA'),
          createTodo('PRODUCT-BBB'),
          createTodo('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Todo Selectors', () => {
    it('getAllTodo() should return the list of Todo', () => {
      const results = TodoSelectors.getAllTodo(state);
      const selId = getTodoId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TodoSelectors.getSelected(state) as Todo;
      const selId = getTodoId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getTodoLoaded() should return the current "loaded" status', () => {
      const result = TodoSelectors.getTodoLoaded(state);

      expect(result).toBe(true);
    });

    it('getTodoError() should return the current "error" state', () => {
      const result = TodoSelectors.getTodoError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
