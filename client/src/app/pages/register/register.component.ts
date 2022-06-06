import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.register(this.registerForm.value).subscribe(res => {
      console.log(res)
    })
  }

}
