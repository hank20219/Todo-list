import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBuilderComponent } from './todo-builder.component';

describe('TodoBuilderComponent', () => {
  let component: TodoBuilderComponent;
  let fixture: ComponentFixture<TodoBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear input value after add()', () => {
    component.description.patchValue('somewords');
    component.add();
    expect(component.description.value).toBeFalsy();
  });
});
