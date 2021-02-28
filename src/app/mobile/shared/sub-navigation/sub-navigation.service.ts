import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubNavigationService {

  @Output() navigating: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  navigateTo(path: string) {
    this.navigating.emit(path);
  }
}
