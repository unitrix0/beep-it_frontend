import {Component, ViewChild} from '@angular/core';
import {UserForLogin} from '../../shared/_models/user-for-login';
import {Router} from '@angular/router';
import {AlertifyService} from '../../_services/alertify.service';
import {UsersService} from '../../_services/users.service';
import {AuthService} from '../../_services/auth.service';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {NgForm} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {RegistrationComponent} from '../registration/registration.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @ViewChild('loginForm') loginForm: NgForm;
  showNavMenu: boolean;
  invitationsCount: any;
  user: UserForLogin = new class implements UserForLogin {
    cameras: MediaDeviceInfo[] = [];
    password: string;
    username: string;
  };

  constructor(public authService: AuthService, private router: Router, private alertify: AlertifyService,
              private usersService: UsersService, private modalService: BsModalService) {
    this.usersService.invitationsCountUpdated.subscribe(count => {
      this.invitationsCount = count;
      if (count > 0) {
        alertify.success('Sie haben neue Einladungen!');
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  showNotificationBadge(): boolean {
    return this.invitationsCount > 0 || !this.authService.currentUser.emailConfirmed;
  }

  showRegistrationForm() {
    const ref = this.modalService.show(RegistrationComponent);
  }


}
