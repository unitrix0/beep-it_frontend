import {Type} from '@angular/core';

export interface NavigationStackItem {
  path: string;
  origin: Type<any>;
}
