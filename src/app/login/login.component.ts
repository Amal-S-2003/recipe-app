import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      console.log(email, password)
      // api call
      this.api.loginAPI({ email, password }).subscribe({
        next: (res: any) => {
          sessionStorage.setItem("user", JSON.stringify(res.existingUser))
          sessionStorage.setItem("token", res.token)
          if (res.existingUser.role == "user") {

            this.router.navigateByUrl('')
          } else {

            this.router.navigateByUrl('/admin')
          }
          this.loginForm.reset()
        },
        error: (reson: any) => {
          alert(reson.error)
          this.loginForm.reset()
        }
      })
    } else {
      alert("Invalid Form")
    }
  }
}
