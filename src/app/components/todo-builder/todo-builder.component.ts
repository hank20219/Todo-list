import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'todo-builder',
  templateUrl: './todo-builder.component.html',
  styleUrls: ['./todo-builder.component.scss'],
})
export class TodoBuilderComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  @Output() taskAdded: EventEmitter<string> = new EventEmitter<string>();
  description: FormControl = new FormControl('', [Validators.required]);
  constructor() {}

  ngOnInit(): void {}

  add() {
    if (this.description.valid) {
      this.taskAdded.emit(this.description.value);
      this.description.patchValue(null);
      this.input.nativeElement.blur();
      this.description.markAsUntouched();
      setTimeout(() => {
        this.input.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  }
}
