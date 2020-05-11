import {Component, ViewChild} from '@angular/core';
import {UserForLogin} from '../_models/user-for-login';
import {Router} from '@angular/router';
import {AlertifyService} from '../_services/alertify.service';
import {UsersService} from '../_services/users.service';
import {AuthService} from '../_services/auth.service';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {NgForm} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {RegistrationComponent} from '../registration/registration.component';
import {RoleNames} from '../_enums/role-names.enum';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @ViewChild('loginForm') loginForm: NgForm;
  showNavMenu: boolean;
  invitationsCount: any;
  isDemoUser: boolean;
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

  login() {
    this.fillInCameras().then(success => {
      this.authService.login(this.user).subscribe(() => {
        this.loginForm.resetForm();
        this.isDemoUser = this.authService.decodedToken.role.includes(RoleNames.demo);
        this.alertify.success('Anmeldung erfolgreich');
        this.router.navigate(['scan']).catch(reason => {
          console.log('Navigation failed: ' + reason);
        });
      }, response => {
        console.log(response);
        if (response.error.isLockedOut) {
          this.alertify.error('Anmeldung fehlgeschlagen: Konto gesperrt');
        } else if (response.error.isNotAllowed) {
          this.alertify.error('Anmeldung nicht erlaubt. Wenden Sie sich an den Support');
        } else {
          this.alertify.error('Anmeldung fehlgeschlagen: Benutzername oder Passwort falsch');
        }
      });

    });
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
  }

  showNotificationBadge(): boolean {
    return this.invitationsCount > 0 || !this.authService.currentUser.emailConfirmed;
  }

  private fillInCameras(): Promise<boolean> {
    const scanner: ZXingScannerComponent = new ZXingScannerComponent();
    return scanner.askForPermission().then(permitted => {
      if (permitted) {
        return scanner.updateVideoInputDevices().then(devices => {
          this.user.cameras = devices;
          return true;
        }).catch(reason => {
          this.alertify.error('Die Liste der verfügbaren Kameras konnte nicht abgefragt werden: ' + reason);
          return false;
        });
      }
    }).catch(reason => {
      this.alertify.error('Die Kameras konnten nicht abgefragt werden: ' + reason);
      return false;
    });
  }

  showRegistrationForm() {
     const ref = this.modalService.show(RegistrationComponent);
  }
}
