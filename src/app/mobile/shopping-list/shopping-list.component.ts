import { Component, OnInit } from '@angular/core';
import {NavigationComponent} from '../shared/sub-navigation/navigation-component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, NavigationComponent {

  constructor() { }

  ngOnInit(): void {
  }

  getBackUrl(): string {
    return '/main/shopping-list';
  }

  onNavigatedTo(params: Map<string, any>): void {
  }
}
