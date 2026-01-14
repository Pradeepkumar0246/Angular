import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userservice } from '../../services/user/userservice';
import { Authservice } from '../../services/auth/authservice';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profilecomponent',
  templateUrl: './profilecomponent.html',
  styleUrls: ['./profilecomponent.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Profilecomponent implements OnInit {
  user: User = {
    userId: 0,
    name: '',
    email: '',
    password: '',
    profileImage: null,
    role: '',
    contactNumber: '',
  };

  selectedFile: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: Authservice,
    private userService: Userservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.userService.getUserById(currentUser.userId).subscribe({
      next: (res: User) => {
        this.user = res;
        if (this.user.profileImage) {
          this.user.profileImageUrl =
            'data:image/png;base64,' + this.user.profileImage;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load user data';
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submitUpdate() {
  if (!this.user.name || !this.user.email) {
    this.errorMessage = 'Please fill required fields';
    return;
  }

  this.userService.updateUser(this.user, this.selectedFile ?? undefined).subscribe({
    next: () => {
      this.successMessage = 'Profile updated successfully!';
      localStorage.setItem('user', JSON.stringify(this.user));

      if (this.user.role === 'Officer') {
        this.router.navigate(['/officer']);
      } 
      if (this.user.role === 'User') {
        this.router.navigate(['/dashboard']);
      } 
      else {        
        this.router.navigate(['/admin']);
      }
    },
    error: () => {
      this.errorMessage = 'Failed to update profile';
    },
  });
}

  goBack() {
  if (this.user.role === 'Officer') {
    this.router.navigate(['/officer']);
  }
  if (this.user.role === 'Admin') {
    this.router.navigate(['/admin']);
  }
  else {
    this.router.navigate(['/dashboard']);
  }
}

}
