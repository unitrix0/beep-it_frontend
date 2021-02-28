import {Component, Type} from '@angular/core';

export interface SubNavigationRuleItem {
  component: Type<any>;
  path: string;
}
