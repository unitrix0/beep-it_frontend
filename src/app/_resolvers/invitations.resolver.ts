import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '../_services/users.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AlertifyService} from '../_services/alertify.service';
import {AuthService} from '../_services/auth.service';
import {UserInvitations} from '../shared/_models/user-invitations';

@Injectable()
export class InvitationsResolver implements Resolve<UserInvitations> {

  constructor(private dataService: UsersService, private auth: AuthService, private router: Router, private alertify: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInvitations> {
    return this.dataService.getInvitations(this.auth.decodedToken.nameid).pipe(
      catchError(err => {
        this.alertify.error('Fehler beim Abfragen der Daten: ' + err);
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
