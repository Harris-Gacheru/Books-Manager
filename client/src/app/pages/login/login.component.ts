import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  error: string = ''
  msg: string = ''
  

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedin()) {
      this.route.navigate(['/books'])
    }
  }

  onSubmit(){
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res)
        this.error = ''
        this.msg = res.message
        localStorage.setItem('token', res.token)

        setTimeout(() => {
          if (this.authService.redirectUrl == null) {
            this.route.navigate(['/books'])
          }
          this.route.navigate([this.authService.redirectUrl])
        }, 1000)
      }, 
      (error) => {
        console.log(error.error.message)
        this.error = error.error.message
      }
    )
  }
}
