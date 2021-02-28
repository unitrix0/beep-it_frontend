import {Component, EventEmitter} from '@angular/core';

export interface NavigationComponent extends Component {
  getBackUrl(): string;
}
