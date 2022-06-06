import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken() || ""
    
      const tokenizedrequest = req.clone({headers: req.headers.set('token', token)})
      
      return next.handle(tokenizedrequest).pipe(
        catchError(err => {
          const error = err.error.message || "Failed. Try again later";

          return throwError(error)
        })
      )
  }
}
