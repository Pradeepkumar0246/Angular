import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../Models/Doctor.model';
import { DoctorserService } from '../../Service/doctor';
import { AuthService } from '../../Service/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-doctorcom',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './doctor.html',
  styleUrl: './doctor.css',
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  loading = false;
  error = '';
  constructor(
    private service: DoctorserService,
    public auth: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (d) => ((this.doctors = d), (this.loading = false)),
      error: () => (
        (this.error = 'Could not load doctors'), (this.loading = false)
      ),
    });
  }
  add() {
    console.log('welcome');
    this.router.navigate(['/doctors/new']);
  }
  edit(id: string) {
    this.router.navigate(['/doctors/edit', id]);
  }
  delete(id: string) {
    if (!confirm('Delete doctor?')) return;
    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Delete failed'),
    });
  }
}
