import { Component } from '@angular/core';
import { Auth } from '../../../../core/services/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthResponse } from '../../../../models/auth.models';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class Login {

  // need to update for ui logic
  showPassword = false;   // drives the eye toggle
  isLoading    = false;   // drives the button disabled + label
  errorMessage = '';      // drives the toast *ngIf

  constructor(private auth: Auth, private router: Router) {}

  userLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if(this.userLoginForm.invalid) return;

    console.log(this.userLoginForm.value);

    this.auth.login(this.userLoginForm.value).subscribe({
      next: (res: AuthResponse) => {
        console.log(res.user);
        if(res.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        if(err.status === 401) {
          this.errorMessage = 'Username or Password is Invalid...';
        } else if(err.status == 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    })
  }
}
