import {Component, OnInit} from '@angular/core';
import {SubNavigationService} from '../../../shared/sub-navigation/sub-navigation.service';
import '../../../shared/section-components/text-box/text-box-edit/text-box-edit-extensions';
import {TextBoxEditComponent} from '../../../shared/section-components/text-box/text-box-edit/text-box-edit.component';

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
    params.setTextBoxEditParams('Name', (event.target as HTMLInputElement).value);
    this.navSrv.navigateTo(TextBoxEditComponent, params);
  }
}
