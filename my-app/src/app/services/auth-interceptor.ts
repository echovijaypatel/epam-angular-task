import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let token = this.authService.getToken();
    // if (token.length > 0) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    // }
    return next.handle(request);
  }
}
