import { environment } from './../../../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { MyAccountService } from './../../pages/my-account/my-account.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';


@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private token: MyAccountService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add server host
    const url = environment.SERVER_URL + req.url;

    // Only intercept API url
    // if (!url.includes('/api/')) {
    //   return next.handle(req);
    // }

    // All APIs need JWT authorization
    const headers = {
      'Accept': 'application/json',
      // 'Accept-Language': this.settings.language,
      'Access-Control-Allow-Origin':'*',
      // 'Authorization': `Bearer ${this.token.get().token}`,
    };
    let requrl = req.url

    const newReq = req.clone({ url:requrl , setHeaders: headers });

    return next.handle(newReq).pipe(
      mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)),
      catchError((error: HttpErrorResponse) => this.handleErrorReq(error))
    );
  }

  private goto(url: string) {
    setTimeout(() => this.router.navigateByUrl(url));
  }

  private handleOkReq(event: HttpEvent<any>): Observable<any> {
    if (event instanceof HttpResponse) {
      const body: any = event.body;
      // failure: { code: **, msg: 'failure' }
      // success: { code: 0,  msg: 'success', data: {} }
      if (body && body.code !== 0) {
        if (body.msg && body.msg !== '') {
          this.snack.open(body.message,'dismiss',{ duration:5000});
        }
        // return throwError([]);
      } else {
        return of(event);
      }
    }
    // Pass down event if everything is OK
    return of(event);
  }

  private handleErrorReq(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        this.token.deleteCookie('authtoken');
        this.goto(`/pages/my-account`);
        break;
      case 403:
      // case 404:
      case 500:
        this.goto(`/sessions/${error.status}`);
        break;
      default:
        if (error instanceof HttpErrorResponse) {
          console.error('ERROR', error);
          this.snack.open(error.error.message || error.message || `${error.status} ${error.statusText}`,'dismiss',{ duration:5000} );
        }
        break;
    }
    return throwError(error);
  }
}
