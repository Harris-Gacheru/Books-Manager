import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string| null = null

  constructor(private http: HttpClient, private route: Router) { }

  login(loginDetails: {email: string, password: string}){
    return this.http.post<any>('http://localhost:5690/api/login', loginDetails)
  }

  register(user:  {username: string, email: string, password: string}){
    return this.http.post<any>('http://localhost:5690/api/register', user)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedin(){
    return !!localStorage.getItem('token')
  }

  logout(){
    localStorage.clear()
    this.route.navigate(['/login'])
  }
}
