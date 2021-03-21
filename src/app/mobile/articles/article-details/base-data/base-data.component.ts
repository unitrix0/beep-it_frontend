import {Component, OnInit} from '@angular/core';
import {SubNavigationService} from '../../../shared/sub-navigation/sub-navigation.service';
import '../../../shared/section-components/text-box/text-box-edit/text-box-edit-extensions';

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
    params.setTextBoxEditValue((event.target as HTMLInputElement).value);
    params.setTextBoxEditLabel('Name');
    this.navSrv.navigateTo('nameEdit', params);
  }
}
