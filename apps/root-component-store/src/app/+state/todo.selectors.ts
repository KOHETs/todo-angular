import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODO_FEATURE_KEY, State, todoAdapter } from './todo.reducer';

// Lookup the 'Todo' feature state managed by NgRx
export const getTodoState = createFeatureSelector<State>(TODO_FEATURE_KEY);

const { selectAll, selectEntities } = todoAdapter.getSelectors();

export const getTodoLoading = createSelector(
  getTodoState,
  (state: State) => state.loading
);

export const getTodoLoaded = createSelector(
  getTodoState,
  (state: State) => state.loaded
);

export const getAllTodo = createSelector(getTodoState, (state: State) =>
  selectAll(state)
);

export const getTodoEntities = createSelector(getTodoState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getTodoState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getTodoEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
