import {EventEmitter, Injectable, Output} from '@angular/core';
import {NavigatingEventArgs} from './navigating-event-args';

@Injectable({
  providedIn: 'root'
})
export class SubNavigationService {

  @Output() navigating: EventEmitter<NavigatingEventArgs> = new EventEmitter<NavigatingEventArgs>();

  constructor() {
  }

  navigateTo(path: string, params: Map<string, any>) {
    const p = params ?? new Map<string, any>();
    this.navigating.emit(new NavigatingEventArgs(path, p));
  }
}
