import {Component, Input, OnInit} from '@angular/core';
import {ButtonBarItem} from './button-bar-item';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent implements OnInit {

  @Input() buttons: ButtonBarItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
