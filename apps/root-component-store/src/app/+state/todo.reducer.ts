import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from '@todo/data-access-todo';
import { TodoActions } from './todo.actions';

export const TODO_FEATURE_KEY = 'todo';

export interface State extends EntityState<Todo> {
  selectedId?: string | number;
  loading: boolean;
  loaded: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
}

export interface TodoPartialState {
  readonly [TODO_FEATURE_KEY]: State;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = todoAdapter.getInitialState({
  loading: false,
  loaded: false,
  creating: false,
  updating: false,
  deleting: false,
});

const todoReducer = createReducer(
  initialState,
  on(TodoActions.load, (state) => ({ ...state, loading: true, loaded: false })),
  on(TodoActions.loadSuccess, (state, { todos }) =>
    todoAdapter.setAll(todos, { ...state, loading: false, loaded: true })
  ),
  on(TodoActions.create, (state) => ({
    ...state,
    creating: true,
    error: null,
  })),
  on(TodoActions.createSuccess, (state, { todo }) =>
    todoAdapter.addOne(todo, { ...state, creating: false })
  ),
  on(TodoActions.update, (state) => ({
    ...state,
    updating: true,
    error: null,
  })),
  on(TodoActions.updateSuccess, (state, { todo }) =>
    todoAdapter.updateOne(
      { id: todo.id, changes: todo },
      { ...state, updating: false }
    )
  ),
  on(TodoActions.deleteMany, (state) => ({
    ...state,
    deleting: true,
    error: null,
  })),
  on(TodoActions.deleteManySuccess, (state, { todoIds }) =>
    todoAdapter.removeMany(todoIds, { ...state, deleting: false })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}
