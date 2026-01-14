import { Component } from '@angular/core';
import { Authservice } from '../../../services/auth/authservice';
import { Router, RouterModule } from '@angular/router';
import { UserRegisterModel } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registercomponent',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './registercomponent.html',
  styleUrls: ['./registercomponent.css']
})
export class Registercomponent {
  name: string = '';
  email: string = '';
  password: string = '';
  contactNumber: string = '';

  errorMessage: string = '';

  constructor(private authService: Authservice, private router: Router) {}

  register(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    // Build payload exactly as API expects
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      contactNumber: this.contactNumber
    };

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Registration failed! Email might already exist.';
      }
    });
  }
}
