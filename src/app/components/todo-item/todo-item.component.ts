import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoItem } from '../../interfaces/todo-item';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input('data') data: TodoItem = {
    description: '',
    isCompleted: false,
    createTime: 0,
  };
  @Output() descriptionChanged: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() deleted: EventEmitter<null> = new EventEmitter<null>();
  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('descriptionEditor') descriptionEditor: ElementRef;
  editMode: boolean = false;
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      description: new FormControl(''),
      isCompleted: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.formGroup.patchValue({ isCompleted: this.data.isCompleted });
    this.formGroup.controls['isCompleted'].valueChanges.subscribe((v) => {
      this.statusChanged.emit(v);
    });
  }

  toggleEditMode() {
    if (this.editMode) {
      this.editMode = false;
      this.descriptionChanged.emit(
        this.formGroup?.controls['description']?.value
      );
    } else {
      this.editMode = true;
      setTimeout(() => {
        if (window.getSelection) {
          let selection = window.getSelection();
          let range = document.createRange();
          range.selectNodeContents(this.descriptionEditor.nativeElement);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 0);
      this.formGroup.patchValue({ description: this.data.description });
    }
  }
}
