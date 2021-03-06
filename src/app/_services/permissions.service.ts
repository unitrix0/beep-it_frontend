import {EventEmitter, Injectable, Output} from '@angular/core';
import {PermissionFlags} from '../shared/_enums/permission-flags.enum';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PermissionToken} from '../shared/_models/permission-token';
import {AuthService} from './auth.service';
import {LocalStorageItemNames} from '../shared/_enums/local-storage-item-names.enum';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AlertifyService} from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {


  /**
   * Verfügbare Permission Flags
   */
  public flags = PermissionFlags;
  public token: PermissionToken;
  @Output() permissionsChanged = new EventEmitter<void>();
  private baseUrl = environment.apiUrl + 'auth/';

  constructor(private jwtHelper: JwtHelperService, authService: AuthService, private http: HttpClient) {
    authService.onLogout.subscribe(() => {
      localStorage.removeItem(LocalStorageItemNames.permissionsToken);
    });
    authService.onLogin.subscribe(() => this.reloadToken());
  }

  private _isUpdating: boolean;

  get isUpdating(): boolean {
    return this._isUpdating;
  }

  /**
   * Prüft ob der Benutzer eines der übergebenen Flags (OR) gesetzt hat
   * @param orFlags Parameter Array der erlaubten Flags
   */
  hasPermissionOr(...orFlags: PermissionFlags[]): boolean {
    let reqFlags: PermissionFlags = 0;
    orFlags.forEach(f => reqFlags |= f);

    // console.log('env:' + this.token.environment_id + ' userPerm:' + this.token.permissions +
    //   ' req:' + reqFlags + ' (' + orFlags.map(f => f).toString() + ') => ' + (this.token.permissions & reqFlags));
    return (this.token.permissions & reqFlags) !== 0;
  }

  /**
   * Lädt und entschlüsselt den Token erneut aus dem LocalStorage
   */
  reloadToken() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem(LocalStorageItemNames.permissionsToken));
    if (token) {
      this.token = new class implements PermissionToken {
        userId = token.nameid;
        environment_id = token.environment_id;
        permissions_serial = token.permissions_serial;
        permissions = parseInt(token.permissions, 2);
      };
    }
  }

  /**
   * Fragt einen neuen Permissions Token vom Server ab für das angegebene Environment
   * @param newEnvironmentId ID des Environment für das die Berechtigungen benötigt werden
   */
  updatePermissionClaims(newEnvironmentId: string): Observable<void> {
    this._isUpdating = true;
    const params = new HttpParams()
      .append('environmentId', newEnvironmentId);

    return this.http.get(this.baseUrl + 'UpdatePermissionClaims/' + this.token.userId, {params: params})
      .pipe(
        map((response: any) => {
          this._isUpdating = false;
          if (response) {
            localStorage.setItem(LocalStorageItemNames.permissionsToken, response.permissionsToken);
            this.reloadToken();
            this.permissionsChanged.emit();
          }
        })
      );
  }
}
