import {EventEmitter, Injectable, Output} from '@angular/core';
import {NavigationStackItem} from './navigation-stack-item';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  private backUrlStack: NavigationStackItem[] = [];
  private _navigatingBack: boolean;

  @Output() backClicked: EventEmitter<NavigationStackItem> = new EventEmitter<NavigationStackItem>();

  constructor() {
    this.loadBackUrlStack();
  }


  get navigatingBack(): boolean {
    return this._navigatingBack;
  }

  get hasEntries(): Boolean {
    return this.backUrlStack.length > 0;
  }


  addToStack(backUrl: NavigationStackItem) {
    console.log(`Added ${backUrl.path} ${backUrl.origin.name}`);
    this.backUrlStack.unshift(backUrl);
    this.saveBackUrlStack();
  }

  navigateBack() {
    this._navigatingBack = true;
    const backUrl = this.backUrlStack[0];

    this.backClicked.emit(backUrl);

    this.backUrlStack.shift();
    this.saveBackUrlStack();
    this._navigatingBack = false;
  }

  clearStack() {
    this.backUrlStack = [];
    this.saveBackUrlStack();
  }

  private loadBackUrlStack() {
    this.backUrlStack = JSON.parse(localStorage.getItem('backUrlStack')) ?? [];
  }

  private saveBackUrlStack() {
    localStorage.setItem('backUrlStack', JSON.stringify(this.backUrlStack));
  }
}
