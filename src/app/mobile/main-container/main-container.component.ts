import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from '../navigation-component';
import {Router} from '@angular/router';
import {ButtonBarItem} from '../button-bar/button-bar-item';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  backUrlStack: string[] = [];
  private navigatingBack: boolean;
  private deactivatingComponentBackUrl: string;
  navbarButtons: ButtonBarItem[] = [
    {icon: 'fa-receipt', routerLink: '/main/scan'},
    {icon: 'fa-box', routerLink: '/main/articles'},
    {icon: 'fa-shopping-cart', routerLink: '/main/shopping-list'},
    {icon: 'fa-cog', routerLink: '/main/users'}
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.loadBackUrlStack();
  }

  onActivate(component: any) {
    if (!this.navigatingBack && this.deactivatingComponentBackUrl) {
      const activatingBackUrl = (component as NavigationComponent).getBackUrl ? (component as NavigationComponent).getBackUrl() : '';
      const backUrl = this.deactivatingComponentBackUrl;

      console.log(`Backurl: ${backUrl} ActivateBack: ${activatingBackUrl}`);
      // const navFromToMainPage = this.navbarButtons.findIndex(b => b.routerLink === activatingBackUrl) > -1 &&
      //   this.navbarButtons.findIndex(b => b.routerLink === backUrl) > -1 &&
      //   this.backUrlStack.length === 0;

      if (this.navbarButtons.findIndex(b => b.routerLink === activatingBackUrl) > -1) {
        this.backUrlStack = [];
        this.saveBackUrlStack();
        return;
      }

      if (backUrl !== '') {
        console.log(`Added ${backUrl}`);
        this.backUrlStack.unshift(backUrl);
        this.saveBackUrlStack();
      }
    }
  }

  onDeactivate(component: any) {
    this.deactivatingComponentBackUrl = (<NavigationComponent>component).getBackUrl !== undefined
      ? (<NavigationComponent>component).getBackUrl()
      : undefined;
  }

  onNavigateBack() {
    this.navigatingBack = true;
    this.router.navigate([this.backUrlStack[0]])
      .then(() => {
        this.navigatingBack = false;
        this.backUrlStack.shift();
        this.saveBackUrlStack();
      })
      .catch(reason => {
        this.navigatingBack = false;
        console.log(`Navigation failed: ${reason}`);
      });
  }

  private loadBackUrlStack() {
    this.backUrlStack = localStorage.getItem('backUrlStack').split(',');
  }

  private saveBackUrlStack() {
    localStorage.setItem('backUrlStack', this.backUrlStack.join(','));
  }
}
