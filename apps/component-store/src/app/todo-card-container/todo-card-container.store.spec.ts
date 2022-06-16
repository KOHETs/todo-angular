import { TestBed } from '@angular/core/testing';

import { TodoCardContainerStore } from './todo-card-container.store';

describe('TodoCardContainerStore', () => {
  let service: TodoCardContainerStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoCardContainerStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
