import {Component, Input, OnInit} from '@angular/core';
import {NavigationComponent} from '../../../sub-navigation/navigation-component';

@Component({
  selector: 'app-text-box-edit',
  templateUrl: './text-box-edit.component.html',
  styleUrls: ['./text-box-edit.component.css']
})
export class TextBoxEditComponent implements OnInit, NavigationComponent {
  @Input() backUrl: string;
  textBoxValue: string;
  textBoxLabel: string;

  constructor() { }

  ngOnInit(): void {
  }

  getBackUrl(): string {
    return this.backUrl;
  }

  onNavigatedTo(params: Map<string, any>): void {
    this.textBoxValue = params.getTextBoxEditValue();
    this.textBoxLabel = params.getTextBoxEditLabel();
  }
}
