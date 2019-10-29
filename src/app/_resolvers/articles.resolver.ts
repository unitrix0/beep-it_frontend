import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {PaginatedResult} from '../_models/pagination';
import {Article} from '../_models/article';
import {DataService} from '../_services/data.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AlertifyService} from '../_services/alertify.service';

@Injectable()
export class ArticlesResolver implements Resolve<PaginatedResult<Article[]>> {
  pageNumber = 1;
  pageSize = 5;

  constructor(private dataService: DataService, private router: Router, private alertify: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<Article[]>> {
    return this.dataService.getArticles(this.pageNumber, this.pageSize).pipe(
      catchError(err => {
        this.alertify.error('Fehler beim Abfragen der Daten: ' + err.message);
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
