import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === 401) {
            return throwError(response.statusText);
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
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
