import {NavigationComponent} from './navigation-component';
import {Type} from '@angular/core';

export class NavigatingEventArgs {
  private readonly _component: Type<NavigationComponent>;
  private readonly _params: Map<string, any>;

  get params(): Map<string, any> {
    return this._params;
  }

  get component(): Type<NavigationComponent> {
    return this._component;
  }

  constructor(component: Type<NavigationComponent>, params: Map<string, any>) {
    this._component = component;
    this._params = params;
  }
}
