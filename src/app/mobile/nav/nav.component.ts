import {Component, OnInit} from '@angular/core';
import {BackButtonService} from '../shared/services/back-button.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public backButtonService: BackButtonService) {
  }

  ngOnInit(): void {
  }

  onBackClicked() {
    this.backButtonService.navigateBack();
  }
}
