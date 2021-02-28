import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from '../navigation-component';
import {Router} from '@angular/router';
import {ButtonBarItem} from '../button-bar/button-bar-item';
import {BackButtonService} from '../shared/services/back-button.service';
import {NavigationStackItem} from '../shared/services/navigation-stack-item';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  private deactivatingComponentBackUrl: string;
  private navigatingBack: boolean;
  navbarButtons: ButtonBarItem[] = [
    {icon: 'fa-receipt', routerLink: '/main/scan'},
    {icon: 'fa-box', routerLink: '/main/articles'},
    {icon: 'fa-shopping-cart', routerLink: '/main/shopping-list'},
    {icon: 'fa-cog', routerLink: '/main/users'}
  ];

  constructor(private router: Router, private backButtonService: BackButtonService) {
    backButtonService.backClicked.subscribe((stackItem: NavigationStackItem) => {
      if (stackItem.origin === MainContainerComponent) {
        this.navigatingBack = true;
        router.navigate([stackItem.path])
          .then(() => {
            this.navigatingBack = false;
          })
          .catch(reason => {
            this.navigatingBack = false;
            console.log('Navigation failed');
            console.log(reason);
          });
      }
    });
  }

  ngOnInit(): void {
  }

  onActivate(component: any) {
    if (!this.backButtonService.navigatingBack && this.deactivatingComponentBackUrl) {
      const activatingComponent = component as NavigationComponent;
      const activatingBackUrl = activatingComponent.getBackUrl ? activatingComponent.getBackUrl() : '';
      const backUrl = this.deactivatingComponentBackUrl;

      if (this.navbarButtons.findIndex(b => b.routerLink === activatingBackUrl) > -1) {
        this.backButtonService.clearStack();
        return;
      }

      if (backUrl !== '') {
        this.backButtonService.addToStack({path: backUrl, origin: MainContainerComponent});
      }
    }
  }

  onDeactivate(component: any) {
    const navComponent = <NavigationComponent>component;
    this.deactivatingComponentBackUrl = navComponent.getBackUrl !== undefined
      ? navComponent.getBackUrl()
      : undefined;
  }
}
