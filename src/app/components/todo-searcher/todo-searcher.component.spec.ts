import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSearcherComponent } from './todo-searcher.component';

describe('TodoSearcherComponent', () => {
  let component: TodoSearcherComponent;
  let fixture: ComponentFixture<TodoSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoSearcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear input value after clear()', () => {
    component.value.patchValue('somewords');
    component.clear();
    expect(component.value.value).toBeFalsy();
  });
});
