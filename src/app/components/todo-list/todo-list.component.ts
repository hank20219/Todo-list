import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item';
import { FilterMode } from '../../enums/filter-mode';
import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        'show',
        style({
          transform: 'scaleX(1)',
        })
      ),
      state(
        'hide',
        style({
          transform: 'scaleX(0)',
        })
      ),
      transition('show <=> hide', [animate('.1s')]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [
    { description: 'todo1', createTime: 0, isCompleted: false },
    { description: 'todo2', createTime: 1, isCompleted: true },
  ];

  filterMode: FormControl = new FormControl(0);
  descending: boolean = false;
  keyword: string = '';

  public FilterMode: typeof FilterMode = FilterMode;

  constructor() {}

  ngOnInit(): void {}

  descriptionChange(value: string, index: number) {
    this.todoList[index].description = value;
  }

  statusChange(value: boolean, index: number) {
    this.todoList[index].isCompleted = value;
  }

  addTask(value: string) {
    let newTask: TodoItem = {
      description: value,
      createTime: Date.now(),
      isCompleted: false,
    };
    if (this.descending) {
      this.todoList.unshift(newTask);
    } else {
      this.todoList.push(newTask);
    }
  }

  delete(index: number) {
    this.todoList.splice(index, 1);
  }

  changeSort() {
    if (this.descending) {
      this.todoList.sort((a, b) => a.createTime - b.createTime);
    } else {
      this.todoList.sort((a, b) => b.createTime - a.createTime);
    }
    this.descending = !this.descending;
  }

  search(value: string) {
    this.keyword = value;
  }

  toggleFilter() {
    if (this.filterMode.value === FilterMode.None) {
      this.filterMode.patchValue(FilterMode.ShowTodo);
    } else {
      this.filterMode.patchValue(FilterMode.None);
    }
  }

  checkItemInvisibility(item: TodoItem) {
    return (
      (this.keyword && !item.description.match(this.keyword)) ||
      (this.filterMode.value !== FilterMode.None &&
        this.filterMode.value !==
          (item.isCompleted ? FilterMode.ShowCompleted : FilterMode.ShowTodo))
    );
  }
}
