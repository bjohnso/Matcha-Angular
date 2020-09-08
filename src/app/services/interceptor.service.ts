import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {JWTTokenService} from './jwt-token.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({providedIn: 'root'})
export class InterceptorService implements HttpInterceptor {

  constructor(private jwtService: JWTTokenService,
              private router: Router,
              private spinner: NgxSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show('nav-spinner').then();
    if (!req.url.includes('api/auth/login') && !req.url.includes('/api/auth/register')) {
      const authToken = this.jwtService.getToken();
      if (authToken != null) {
        const clone = req.clone({
          headers : req.headers.append('auth-token', authToken)
        });
        return next.handle(clone).pipe(map(event => {
          return event;
        })).pipe(finalize(() => { this.spinner.hide('nav-spinner').then(); }));
      } else {
        // No Auth Token - Please Login
        this.router.navigate(['auth']).then();
      }
    } else {
      return next.handle(req).pipe(finalize(() => { this.spinner.hide('nav-spinner').then(); }));
    }
  }
}
