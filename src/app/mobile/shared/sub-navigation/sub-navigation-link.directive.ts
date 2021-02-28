import {Directive, HostListener, Input} from '@angular/core';
import {SubNavigationService} from './sub-navigation.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[SubNavLink]'
})
export class SubNavigationLinkDirective {
  @Input('SubNavLink') path: string;

  @HostListener('click', ['$event']) onclick($event) {
    console.log(`SubNavigation to: ${this.path}`);
    this.navService.navigateTo(this.path);
  }

  constructor(private navService: SubNavigationService) {

  }
}
