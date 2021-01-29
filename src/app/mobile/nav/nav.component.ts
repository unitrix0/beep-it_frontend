import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() show: boolean;
  @Output() navigateBack: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit(): void {
  }

  onBackClicked() {
    this.navigateBack.emit(null);
  }
}
