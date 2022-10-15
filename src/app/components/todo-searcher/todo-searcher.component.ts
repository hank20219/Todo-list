import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'todo-searcher',
  templateUrl: './todo-searcher.component.html',
  styleUrls: ['./todo-searcher.component.scss'],
})
export class TodoSearcherComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  value: FormControl = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit(): void {
    this.value.valueChanges.subscribe((v) => {
      let res = v.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      console.log(res);
      this.search.emit(res);
    });
  }

  clear() {
    this.value.patchValue('');
  }
}
