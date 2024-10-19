import {Injectable} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from '../_services/auth.service';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {

  private refreshRunning: boolean;
  private refreshDone: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.TokenIsExpired()) {
      if (!this.refreshRunning) {
        this.refreshRunning = true;
        this.refreshDone.next(null);
        console.log('Token has expired... refreshing!');

        this.authService.refreshToken().pipe(
          switchMap(value => {
            this.refreshRunning = false;
            this.refreshDone.next('xxx');
            return next.handle(request);
          }));
      } else {
        return this.refreshDone.pipe(
          tap(value => console.log('waiting: ' + request.url)),
          filter(value => value != null),
          take(1),
          tap(x => console.log('go: ' + request.url)),
          switchMap(value => {
            console.log('next...');
            return next.handle(request);
          }));
      }
    } else {
      console.log('Token is valid...');
      return next.handle(request);
    }
  }
}

export const tokenExpiredInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenExpiredInterceptor,
  multi: true
};
