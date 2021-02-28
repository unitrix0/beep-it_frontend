import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appSubNavigationHost]'
})
export class SubNavigationHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
