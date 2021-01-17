import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserForLogin} from '../shared/_models/user-for-login';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {AlertifyService} from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  invitationsCount: any;
  user: UserForLogin = new class implements UserForLogin {
    cameras: MediaDeviceInfo[] = [];
    password: string;
    username: string;
  };

  constructor(public authService: AuthService, public router: Router, public alertify: AlertifyService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.fillInCameras().then(success => {
      this.authService.login(this.user).subscribe(() => {
        this.loginForm.resetForm();
        this.alertify.success('Anmeldung erfolgreich');

        this.router.navigate(['main/scan']).catch(reason => {
          console.log('Navigation failed: ' + reason);
        });
      }, response => {
        console.log(response);
        this.alertify.error('Anmeldung fehlgeschlagen: ' + response);
      });

    });
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

}
