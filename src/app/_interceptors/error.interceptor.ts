import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AuthService} from '../_services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private refreshRunning: boolean;
  private refreshDone: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === 401) {
            if (this.authService.TokenIsExpired()) {
              return this.RefreshToken(next, req);
            } else {
              return throwError(response.statusText);
            }
          }

          const applicationError = response.headers.get('Application-Error');
          if (applicationError) {
            console.error(response.error);
            return throwError(applicationError);
          }

          if (response.status === 0) {
            console.log(response);
            return throwError('Unbekannter fehler');
          }

          const serverError = response.error;
          let modalStateErrors = '';
          if (serverError && typeof serverError === 'object') {
            modalStateErrors = '<ul>\n';
            for (const key in serverError) {
              if (serverError[key] && serverError[key].description !== undefined) {
                modalStateErrors += '<li>' + serverError[key].description + '</li>\n';
              }
            }
            modalStateErrors += '</ul>';
          }
          return throwError(modalStateErrors || serverError || 'Server Error');
        }
      })
    );
  }

  private RefreshToken(next: HttpHandler, req: HttpRequest<any>) {
    if (!this.refreshRunning) {
      console.log('Token has expired... refreshing!');
      this.refreshRunning = true;
      this.refreshDone.next(null);

      return this.authService.refreshToken().pipe(
        catchError(err => {
          this.authService.logout();
          console.log(err);
          return throwError(err);
        }),
        switchMap(newToken => {
          this.refreshRunning = false;
          this.refreshDone.next(newToken);
          return next.handle(this.UpdateAuthorizationHeader(req, newToken));
        }));
    } else {
      return this.refreshDone.pipe(
        filter(newToken => newToken != null),
        take(1),
        switchMap(newToken => {
          return next.handle(this.UpdateAuthorizationHeader(req, newToken));
        }));
    }
  }

  private UpdateAuthorizationHeader(req: HttpRequest<any>, newToken: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + newToken
      }
    });
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
