import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {AuthService} from '../_services/auth.service';
import {jwtGetter} from '../app.module';
import {LocalStorageItemNames} from '../_enums/local-storage-item-names.enum';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private refreshRunning: boolean;
  private refreshDone: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === 401) {
            console.log(response.url + ' => 401');
            if (!this.refreshRunning) {
              console.log('Token has expired... refreshing!');
              this.refreshRunning = true;
              this.refreshDone.next(null);

              return this.authService.refreshToken().pipe(
                switchMap(value => {
                  this.refreshRunning = false;
                  this.refreshDone.next('xxx');
                  return next.handle(this.UpdateToken(req));
                }));
            } else {
              return this.refreshDone.pipe(
                tap(value => console.log('waiting: ' + value + ' ' + req.url)),
                filter(value => value != null),
                take(1),
                tap(x => console.log('go: ' + req.url)),
                switchMap(value => {
                  console.log('next... ' + req.url);
                  return next.handle(this.UpdateToken(req));
                }));
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

  private UpdateToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + localStorage.getItem(LocalStorageItemNames.identityToken)
      }
    });
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
