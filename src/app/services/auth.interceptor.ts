import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

// interceptors are typescript classes which implement the interface HttpInterceptor with the injectable decorator

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (private authService: AuthService){}
  // the intercept method will be called for each request and will receive the request as argument

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // append to the headers the bearer token
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`);
    // the requests are immuables objects so we have to create a new one to modify it
    // next.handle allows us to go to the next request

    const modifiedReq = req.clone({ headers });
    return next.handle(modifiedReq);
  }

}
