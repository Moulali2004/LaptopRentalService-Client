import { Component } from '@angular/core';
import { Auth } from '../../../../core/services/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  standalone: true
})
export class Register {

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;
  passwordMatching: string = '';

  constructor(private authService: Auth, private router: Router) {}

  userType: string[] = ["student", "Bussiness", "Gamer/Creator", "Developer/Freelancer"];
  role: string[] = ["customer", "admin"];

  userForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    usertype: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if(!this.userForm.valid) return;

    if(this.userForm.value.password !== this.userForm.value.confirmPassword) {
      this.passwordMatching = 'Passwords does not match...';
      return;
    }

    console.log(this.userForm.value);

    //Call registration api here and navigate to login page on success
    this.authService.register(this.userForm.value).subscribe({
      next: (res) => {
          this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        alert("An error occurred during registration: " + err.message);
      }
    })
  }
}
