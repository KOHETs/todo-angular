import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardContainerComponent } from './todo-card-container.component';

describe('TodoCardContainerComponent', () => {
  let component: TodoCardContainerComponent;
  let fixture: ComponentFixture<TodoCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoCardContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
