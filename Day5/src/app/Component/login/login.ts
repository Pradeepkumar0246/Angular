import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [[FormsModule,CommonModule,ReactiveFormsModule],],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  form: FormGroup;
error = '';
constructor(private fb: FormBuilder, private auth:
AuthService, private router: Router) {
this.form = this.fb.group({
username: ['', Validators.required], passwordHash:
['', Validators.required]
});

}
submit() {
if (this.form.invalid) return;
const { username, passwordHash } = this.form.value;
this.auth.login(username, passwordHash).subscribe({
next: () => this.router.navigate(['/']),
error: (err) => (this.error =
err?.error?.message || 'Login failed')
});
}

}
