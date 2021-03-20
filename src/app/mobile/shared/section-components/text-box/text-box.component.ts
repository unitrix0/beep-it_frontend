import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {

  @Input() label: string;
  @Input() value: string;
  @Input() bottomBorder = true;
  @Output() clicked: EventEmitter<Event> = new EventEmitter<Event>();


  constructor() {
  }

  ngOnInit(): void {
  }

}
