import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   let token =localStorage.getItem("token"); //token ı yakalamak için yazdık.
   let newRequest : HttpRequest<any>; //Bizim yaptığımız istek bu.
   newRequest = request.clone({headers:request.headers.set("Authorization", "Bearer" + token)
  }) //kullanıcının yaptığı isteği klonla diyoruz.
  
   return next.handle(newRequest);
  }
}
