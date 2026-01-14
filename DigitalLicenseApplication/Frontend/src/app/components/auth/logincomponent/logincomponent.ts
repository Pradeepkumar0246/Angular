import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Authservice } from '../../../services/auth/authservice';
import { Router, RouterModule } from '@angular/router';
import { UserLoginModel } from '../../../models/user.model';

@Component({
  selector: 'app-logincomponent',
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './logincomponent.html',
  styleUrls: ['./logincomponent.css'],
})
export class Logincomponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
    const redirectPath = this.authService.redirectAfterLogin();
    this.router.navigate([redirectPath]);
    return;
  }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const model: UserLoginModel = this.loginForm.value;

    this.authService.login(model).subscribe({
      next: (res) => {
        const redirectPath = this.authService.redirectAfterLogin();
        this.router.navigate([redirectPath]);
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
      },
    });
  }
}
