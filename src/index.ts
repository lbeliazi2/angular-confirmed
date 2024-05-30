import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from "./app/services/auth.interceptor";

// if we want to add multiple interceptors in order to not pollute the app module
// we create this file
// multi true allows us to defined multiple interceptors
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
