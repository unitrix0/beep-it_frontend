import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type,
  ViewChild
} from '@angular/core';
import {SubNavigationService} from './sub-navigation.service';
import {SubNavigationHostDirective} from './sub-navigation-host.directive';
import {NavigationComponent} from './navigation-component';
import {Subscription} from 'rxjs';
import {NavigatingEventArgs} from './navigating-event-args';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sub-navigation-outlet',
  template: `
    <ng-template appSubNavigationHost></ng-template>
  `,
  styles: []
})
export class SubNavigationOutletComponent implements OnInit, OnDestroy {
  @Input() startComponent: Type<NavigationComponent>;
  @Input() startComponentParameters: Map<string, any>;
  @Output() activating: EventEmitter<any> = new EventEmitter<any>();
  @Output() deactivating: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(SubNavigationHostDirective, {static: true}) componentHost: SubNavigationHostDirective;
  private currentComponent: NavigationComponent;
  private navigatingSubscription: Subscription;
  private componentRef: ComponentRef<any>;

  constructor(private factoryResolver: ComponentFactoryResolver, public navService: SubNavigationService) {
  }

  ngOnInit(): void {
    // this.createComponent(this.rules[0], new Map<string, any>());
    if (this.startComponent) {
      if (!this.startComponentParameters) {
        this.startComponentParameters = new Map<string, any>();
      }

      this.createComponent(this.startComponent, this.startComponentParameters);
    }

    this.navigatingSubscription = this.navService.navigating.subscribe((args: NavigatingEventArgs) => {
      this.deactivating.emit(this.currentComponent);
      this.createComponent(args.component, args.params);
      this.activating.emit(this.currentComponent);
    });
  }

  private createComponent(componentType: Type<NavigationComponent>, navigationParameters: Map<string, any>) {
    const componentFactory = this.factoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.currentComponent = this.componentRef.instance as NavigationComponent;
    this.currentComponent.onNavigatedTo(navigationParameters);
    console.log((this.currentComponent as NavigationComponent));
  }

  ngOnDestroy(): void {
    this.navigatingSubscription.unsubscribe();
    this.componentRef.destroy();
  }
}
