import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {BeepEnvironment} from '../_models/beep-environment';
import {ActivatedRoute} from '@angular/router';
import {Permission} from '../_models/permission';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  currentEnvironment: BeepEnvironment;
  currentMember: Permission;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    for (let i = 0; i < this.user.environments.length; i++) {
      console.log(i + ': ' + this.user.environments[i].name);
    }
  }

  selectEnvironment(environmentIdx: number) {
    this.currentEnvironment = this.user.environments[environmentIdx];
    this.currentMember = this.currentEnvironment.permissions[0];
  }

  selectUser(userIdx: number) {
    this.currentMember = this.currentEnvironment.permissions[userIdx];
  }

  applyPermissions() {
    console.log(this.currentMember);
  }
}
