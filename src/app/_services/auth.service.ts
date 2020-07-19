import {HttpClient, HttpParams} from '@angular/common/http';
import {map, switchMap, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {UserForLogin} from '../_models/user-for-login';
import {environment} from '../../environments/environment';
import {UserToken} from '../_models/userToken';
import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserForRegistration} from '../_models/user-for-registration';
import {User} from '../_models/user';
import {IdentityToken} from '../_models/identity-token';
import {LocalStorageItemNames} from '../_enums/local-storage-item-names.enum';
import {RoleNames} from '../_enums/role-names.enum';

@Injectable()
export class AuthService {
  onLogin = new EventEmitter();
  onLogout = new EventEmitter();
  decodedToken: IdentityToken;
  currentUser: UserToken;
  private baseUrl = environment.apiUrl + 'auth/';
  private _identityToken: string;
  private _refreshToken: string;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
  }

  get isDemoAccount(): boolean {
    return this.decodedToken.role.includes(RoleNames.demo);
  }

  login(user: UserForLogin): Observable<void> {
    return this.http.post(this.baseUrl + 'login', user)
      .pipe(
        map((response: any) => {
          console.log(response);
          if (response) {
            this.saveTokens(response);
            this.onLogin.emit();
          }
        })
      );
  }

  refreshToken(): Observable<string> {
    return this.http.post<object>(this.baseUrl + 'RefreshToken', {
      'token': this._identityToken,
      'refreshToken': this._refreshToken
    }).pipe(
      map(response => {
        console.log('refresh succeeded');
        this.saveTokens(response);
        return this._identityToken;
      }));
  }

  demoLogin(): Observable<void> {
    return this.http.post(this.baseUrl + 'DemoLogin', null)
      .pipe(
        map(response => {
          if (response) {
            this.saveTokens(response);
            this.onLogin.emit();
          }
        })
      );
  }

  logout() {
    localStorage.clear();
    this.decodedToken = null;

    this.currentUser = null;
    this.onLogout.emit();
    this.router.navigate(['/']);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem(LocalStorageItemNames.identityToken);
    try {
      const decToken = this.jwtHelper.decodeToken(token);
      return decToken !== null;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }

  register(newUser: UserForRegistration): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'register', newUser);
  }

  userExists(username: string): Observable<boolean> {
    const params = new HttpParams()
      .append('username', username);

    return this.http.get<boolean>(this.baseUrl + 'UserExists/' + this.decodedToken.nameid, {params: params});
  }

  reloadToken() {
    const token = localStorage.getItem(LocalStorageItemNames.identityToken);
    const refreshToken = localStorage.getItem(LocalStorageItemNames.refreshToken);
    const user: UserToken = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this._identityToken = token;
    }

    if (refreshToken) {
      this._refreshToken = refreshToken;
    }

    if (user) {
      this.currentUser = user;
    }
  }

  updateDisplayName(displayName: string) {
    this.currentUser.displayName = displayName;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  resendEmailConfirmation(username: string): Observable<any> {
    return this.http.get(this.baseUrl + 'ResendEmailConfirmation/' + username);
  }

  confirmEmail(userId: string, email: string, token: string, isChange: boolean): Observable<any> {
    const p = new HttpParams()
      .append('id', userId)
      .append('email', email)
      .append('isChange', String(isChange))
      .append('token', token);

    return this.http.put(this.baseUrl + 'ConfirmEmail', {}, {params: p})
      .pipe(map(response => {
        if (!response) {
          this.currentUser.emailConfirmed = true;
          localStorage.setItem('user', JSON.stringify(this.currentUser));
        }
      }));
  }

  TokenIsExpired(): boolean {
    if (this._identityToken) {
      return this.jwtHelper.isTokenExpired(this._identityToken);
    }

    return false;
  }

  private saveTokens(response: any) {
    if (response.identityToken) {
      this._identityToken = response.identityToken;
      localStorage.setItem(LocalStorageItemNames.identityToken, response.identityToken);
      this.decodedToken = this.jwtHelper.decodeToken(response.identityToken);
      console.log('Valid until: ' + this.jwtHelper.getTokenExpirationDate(this._identityToken));
    }

    if (response.refreshToken) {
      this._refreshToken = response.refreshToken;
      localStorage.setItem(LocalStorageItemNames.refreshToken, response.refreshToken);
    }

    if (response.permissionsToken) {
      localStorage.setItem(LocalStorageItemNames.permissionsToken, response.permissionsToken);
    }

    if (response.settings) {
      localStorage.setItem(LocalStorageItemNames.settings, JSON.stringify(response.settings));
    }

    if (response.mappedUser) {
      localStorage.setItem('user', JSON.stringify(response.mappedUser));
      this.currentUser = response.mappedUser;
    }
  }
}

