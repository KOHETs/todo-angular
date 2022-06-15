import { TestBed } from '@angular/core/testing';

import { TodoCardContainerService } from './todo-card-container.service';

describe('TodoCardContainerService', () => {
  let service: TodoCardContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoCardContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
