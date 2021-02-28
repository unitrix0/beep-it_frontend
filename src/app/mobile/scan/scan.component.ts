import {Component, EventEmitter, OnInit} from '@angular/core';
import {NavigationComponent} from '../navigation-component';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit, NavigationComponent {
  subNavigation: EventEmitter<any>;

  constructor() { }

  ngOnInit(): void {
  }

  getBackUrl(): string {
    return '/main/scan';
  }


}
