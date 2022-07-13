import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  error: string = ''
  msg: string = ''

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.register(this.registerForm.value).subscribe(
      (res) => {
        this.error = ''
        this.msg = res.message

        setTimeout(() => {
          this.route.navigate(['/login'])
        }, 1200)
      },
      (error) => {
        console.log(error)
        this.error = error
      }
    )
  }

}
