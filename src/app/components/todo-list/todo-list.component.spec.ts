import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todoList = [
      { description: 'todo1', createTime: 0, isCompleted: false },
      { description: 'todo2', createTime: 1, isCompleted: true },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('todo description should have same value as set value', () => {
    component.descriptionChange('someword', 0);
    expect(component.todoList[0].description).toEqual('someword');
  });

  it('todo status should have same value as set value', () => {
    component.statusChange(true, 0);
    expect(component.todoList[0].isCompleted).toEqual(true);
  });

  it('added task should at end of the list if order is descending and vice versa', () => {
    component.descending = true;
    component.addTask('someword');
    expect(component.todoList[0].description).toEqual('someword');

    component.descending = false;
    component.addTask('someotherword');
    expect(
      component.todoList[component.todoList.length - 1].description
    ).toEqual('someotherword');
  });

  it('todo should be removed from list after delete', () => {
    let originalLength = component.todoList.length;
    let deletedTodo = component.todoList[0];
    component.delete(0);
    expect(component.todoList.length).toEqual(originalLength - 1);
    expect(
      component.todoList.findIndex((v) => {
        return (
          v.description === deletedTodo.description &&
          v.createTime === deletedTodo.createTime
        );
      })
    ).toBe(-1);
  });

  it('createTime should at right order after changeSort()', () => {
    component.descending = true;
    component.changeSort();
    expect(component.todoList[0].createTime).toBeLessThan(
      component.todoList[component.todoList.length - 1].createTime
    );
    component.changeSort();
    expect(component.todoList[0].createTime).toBeGreaterThan(
      component.todoList[component.todoList.length - 1].createTime
    );
  });

  it('should update keyword value after search', () => {
    component.search('someword');
    expect(component.keyword).toEqual('someword');
  });

  it('should change filterMode after toggleFilter()', () => {
    component.filterMode.patchValue(component.FilterMode.None);
    component.toggleFilter();
    expect(component.filterMode.value).toEqual(component.FilterMode.ShowTodo);
    component.toggleFilter();
    expect(component.filterMode.value).toEqual(component.FilterMode.None);
  });

  it('todo invisibility should be true if condition is met and vice versa', () => {
    component.keyword = '1';
    expect(component.checkItemInvisibility(component.todoList[0])).toBeFalsy();
    expect(component.checkItemInvisibility(component.todoList[1])).toBeTruthy();
    component.keyword = '';
    component.filterMode.patchValue(component.FilterMode.ShowCompleted);
    expect(component.checkItemInvisibility(component.todoList[1])).toBeFalsy();
    expect(component.checkItemInvisibility(component.todoList[0])).toBeTruthy();
  });
});
