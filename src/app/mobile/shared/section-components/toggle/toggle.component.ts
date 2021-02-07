import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  @Input() label: string;
  @Input() bottomBorder: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
