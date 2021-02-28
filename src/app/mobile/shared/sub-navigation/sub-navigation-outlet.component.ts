import {Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SubNavigationRuleItem} from './sub-navigation-rule-item';
import {SubNavigationService} from './sub-navigation.service';
import {SubNavigationHostDirective} from './sub-navigation-host.directive';
import {NavigationComponent} from '../../navigation-component';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sub-navigation-outlet',
  template: `
    <ng-template appSubNavigationHost></ng-template>
  `,
  styles: []
})
export class SubNavigationOutletComponent implements OnInit, OnDestroy {

  @Input() rules: SubNavigationRuleItem[];
  @Output() activating: EventEmitter<any> = new EventEmitter<any>();
  @Output() deactivating: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(SubNavigationHostDirective, {static: true}) componentHost: SubNavigationHostDirective;
  private currentComponent: any;
  private navigatingSubscription: Subscription;
  private componentRef: ComponentRef<any>;

  constructor(private factoryResolver: ComponentFactoryResolver, public navService: SubNavigationService) {
  }

  ngOnInit(): void {
    this.createComponent(this.rules[0]);

    this.navigatingSubscription = this.navService.navigating.subscribe(path => {
      const rule = this.rules.find(r => r.path === path);

      this.deactivating.emit(this.currentComponent);
      this.createComponent(rule);
      this.activating.emit(this.currentComponent);
    });
  }

  private createComponent(rule: SubNavigationRuleItem) {
    const componentFactory = this.factoryResolver.resolveComponentFactory(rule.component);

    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.currentComponent = this.componentRef.instance;
  }

  ngOnDestroy(): void {
    this.navigatingSubscription.unsubscribe();
    this.componentRef.destroy();
  }
}
