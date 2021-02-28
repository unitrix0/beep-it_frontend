import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {

  @Input() label: string;
  @Input() value: string;
  @Input() bottomBorder = true;


  constructor() {
  }

  ngOnInit(): void {
  }

}
