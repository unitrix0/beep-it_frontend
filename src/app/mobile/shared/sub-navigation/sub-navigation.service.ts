import {EventEmitter, Injectable, Output, Type} from '@angular/core';
import {NavigatingEventArgs} from './navigating-event-args';
import {NavigationComponent} from './navigation-component';

@Injectable({
  providedIn: 'root'
})
export class SubNavigationService {

  @Output() navigating: EventEmitter<NavigatingEventArgs> = new EventEmitter<NavigatingEventArgs>();

  constructor() {
  }

  navigateTo(component: Type<NavigationComponent>, params: Map<string, any>) {
    const p = params ?? new Map<string, any>();
    this.navigating.emit(new NavigatingEventArgs(component, p));
  }
}
