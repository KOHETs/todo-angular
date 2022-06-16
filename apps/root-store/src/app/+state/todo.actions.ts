import { props } from '@ngrx/store';
import { Todo } from '@todo/data-access-todo';

import { createActionGroup, emptyProps } from '@ngrx/store';

export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ todos: Todo[] }>(),
    Create: props<{ name: Todo['name'] }>(),
    'Create Success': props<{ todo: Todo }>(),
    Update: props<{ todo: Todo }>(),
    'Update Success': props<{ todo: Todo }>(),
    'Delete Many': props<{ todoIds: Todo['id'][] }>(),
    'Delete Many Success': props<{ todoIds: Todo['id'][] }>(),
  },
});
