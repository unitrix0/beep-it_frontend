import {Directive, HostListener, Input} from '@angular/core';
import {SubNavigationService} from './sub-navigation.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[SubNavLink]'
})
export class SubNavigationLinkDirective {
  @Input('SubNavLink') path: string;
  @Input() parameters: Map<string, any>;

  @HostListener('click', ['$event']) onclick($event) {
    console.log(`SubNavigation to: ${this.path}`);
    this.navService.navigateTo(this.path, this.parameters);
  }

  constructor(private navService: SubNavigationService) {
    this.parameters = new Map<string, any>([[this.path, new Navigator()]]);
  }
}
