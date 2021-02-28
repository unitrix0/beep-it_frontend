import {Component, OnInit} from '@angular/core';
import {SubNavigationRuleItem} from '../../shared/sub-navigation/sub-navigation-rule-item';
import {ArticleDetailsComponent} from '../article-details/article-details.component';
import {BackButtonService} from '../../shared/services/back-button.service';
import {SubNavigationService} from '../../shared/sub-navigation/sub-navigation.service';
import {NavigationComponent} from '../../navigation-component';
import {TextBoxEditComponent} from '../../shared/section-components/text-box/text-box-edit/text-box-edit.component';

@Component({
  selector: 'app-article-sub-nav-container',
  templateUrl: './article-sub-nav-container.component.html',
  styleUrls: ['./article-sub-nav-container.component.css']
})
export class ArticleSubNavContainerComponent implements OnInit {
  private deactivatingComponentBackUrl: string;
  naviationRules: SubNavigationRuleItem[] = [
    {path: 'baseView', component: ArticleDetailsComponent},
    {path: 'nameEdit', component: TextBoxEditComponent}
  ];

  constructor(private backButtonService: BackButtonService, private navService: SubNavigationService) {
    backButtonService.backClicked.asObservable().subscribe(item => {
      if (item.origin === ArticleSubNavContainerComponent) {
        navService.navigateTo(item.path);
      }
    });
  }

  ngOnInit(): void {
  }


  onActivating(event: any) {
    if (!this.backButtonService.navigatingBack && this.deactivatingComponentBackUrl) {
      const backUrl = this.deactivatingComponentBackUrl;

      if (backUrl !== '') {
        this.backButtonService.addToStack({path: backUrl, origin: ArticleSubNavContainerComponent});
      }
    }
  }

  onDeactivating(event: any) {
    const navComponent = <NavigationComponent>event;
    this.deactivatingComponentBackUrl = this.getBackUrl(navComponent);
    console.log(`Deactivating: ${this.deactivatingComponentBackUrl}`);
  }

  private getBackUrl(component: NavigationComponent) {
    if (component?.getBackUrl) {
      const backUrl = component.getBackUrl();
      console.log(`getBackUrl found ${backUrl} ${component.getBackUrl()}`);
      return backUrl;
    }
  }
}
