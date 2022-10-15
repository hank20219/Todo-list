import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.formGroup.patchValue({ isCompleted: false });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.descriptionEditor).toBeTruthy();
  });

  it('display text should be the same value as form', () => {
    component.data.description = 'somewords';
    component.toggleEditMode();
    expect(component.editMode).toBeTruthy();
    expect(component.formGroup?.controls['description']?.value).toEqual(
      component.data.description
    );
    component.data.description = 'someotherwords';
    component.toggleEditMode();
    expect(component.editMode).toBeFalsy();
    setTimeout(() => {
      expect(component.formGroup?.controls['description']?.value).toEqual(
        component.data.description
      );
    }, 1000);
  });

  it('statusChanged should emit after checkbox value changed', () => {
    spyOn(component.statusChanged, 'emit');
    component.formGroup.patchValue({ isCompleted: true });
    fixture.detectChanges();
    expect(component.statusChanged.emit).toHaveBeenCalledWith(true);
  });
});
