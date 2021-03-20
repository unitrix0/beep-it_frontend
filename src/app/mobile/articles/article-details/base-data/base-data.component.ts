import {Component, OnInit} from '@angular/core';
import {SubNavigationService} from '../../../shared/sub-navigation/sub-navigation.service';

@Component({
  selector: 'app-base-data',
  templateUrl: './base-data.component.html',
  styleUrls: ['./base-data.component.css']
})
export class BaseDataComponent implements OnInit {

  constructor(private navSrv: SubNavigationService) {
  }

  ngOnInit(): void {
  }

  nameClicked(event: Event) {
    const params = new Map<string, any>();
    params.set('test', this);
    this.navSrv.navigateTo('nameEdit', params);
  }
}
