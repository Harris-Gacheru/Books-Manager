import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken()
    
    if (token) {
      const tokenizedrequest = req.clone({headers: req.headers.set('token', token)})
      
      return next.handle(tokenizedrequest)
    }
    throw new Error('Method not implemented.');
  }
}
