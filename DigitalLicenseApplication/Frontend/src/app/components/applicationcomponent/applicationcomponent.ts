import { Component, OnInit } from '@angular/core';
import { Applicationservice } from '../../services/application/applicationservice';
import { Departmentservice } from '../../services/department/departmentservice';
import { OfficerService } from '../../services/officer/officer-service';
import { Userservice } from '../../services/user/userservice';
import { Application } from '../../models/application.model';
import { Department } from '../../models/department.model';
import { User } from '../../models/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Authservice } from '../../services/auth/authservice';

@Component({
  selector: 'app-applicationcomponent',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './applicationcomponent.html',
  styleUrls: ['./applicationcomponent.css'],
})
export class Applicationcomponent implements OnInit {
  applications: Application[] = [];
  filteredApplications: Application[] = [];
  departments: Department[] = [];
  selectedDepartmentId: number | null = null;
  filterStatus: string = ''; 
  loading = false;
  errorMessage = '';
  adminUser: User | null = null;
  rejectionReasons: Record<number, string> = {};
  processingIds = new Set<number>();

  constructor(
    private applicationService: Applicationservice,
    private departmentService: Departmentservice,
    private userservice: Userservice,
    private officerService: OfficerService,
    private authService:Authservice
  ) {}

  user: any | null = null;
  ngOnInit(): void {
    this.user = this.authService.getUser();
  const userJson = localStorage.getItem('adminUser');
  this.adminUser = userJson ? JSON.parse(userJson) : null;

  this.departmentService.getAllDepartments().subscribe({
    next: (depts) => {
      this.departments = depts;
      this.loadApplications(); 
    },
    error: () => console.error('Failed to load departments')
  });
}


  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (depts) => (this.departments = depts),
      error: () => console.error('Failed to load departments'),
    });
  }

  loadApplications(): void {
    this.loading = true;
    this.errorMessage = '';

    this.applicationService.getAllApplications().subscribe({
  next: (apps) => {
    
    this.applications = apps.map(app => ({
      ...app,
      department: this.departments.find(d => d.departmentId === app.departmentId) || null
    }));
    this.applyFilters();
    this.loading = false;
  },
  error: (err) => {
    this.loading = false;
    this.errorMessage = 'Failed to load applications';
    console.error(err);
  }
});

  }

  applyFilters(): void {
    this.filteredApplications = this.applications.filter((app) => {
      const statusMatch = this.filterStatus
        ? app.status === this.filterStatus
        : true;
      const deptMatch = this.selectedDepartmentId
        ? app.departmentId === this.selectedDepartmentId
        : true;
      return statusMatch && deptMatch;
    });
  }

  onDepartmentChange(event: Event): void {
    const selectEl = event.target as HTMLSelectElement;
    const value = selectEl.value;
    this.selectedDepartmentId = value ? +value : null;
    this.applyFilters();
  }

  setStatusFilter(status: string): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  approve(app: Application): void {
    const confirmed = confirm('Are you sure you want to APPROVE this application?');
    if (!confirmed) return;
    if (!this.user) return;

    const officerId = this.user.userId;
    this.processingIds.add(app.applicationId);
    this.officerService.approveApplication(app.applicationId, officerId).subscribe({
      next: () => {
        app.status = 'Approved';
        app.officerId = officerId;
        this.applyFilters();
        this.processingIds.delete(app.applicationId);
      },
      error: (err) => {
        console.error(err);
        this.processingIds.delete(app.applicationId);
        alert('Failed to approve application');
      }
    });
  }

  reject(app: Application): void {
    const reason = (this.rejectionReasons[app.applicationId] || '').trim();
    if (!reason) {
      alert('Please provide a rejection reason');
      return;
    }
    if (!this.user) return;
    const officerId = this.user.userId;

    const confirmed = confirm('Are you sure you want to REJECT this application?');
    if (!confirmed) return;

    this.processingIds.add(app.applicationId);
    this.officerService.rejectApplication(app.applicationId, officerId, reason).subscribe({
      next: () => {
        app.status = 'Rejected';
        app.rejectionReason = reason;
        app.officerId = officerId;
        this.applyFilters();
        this.rejectionReasons[app.applicationId] = '';
        this.processingIds.delete(app.applicationId);
      },
      error: (err) => {
        console.error(err);
        this.processingIds.delete(app.applicationId);
        alert('Failed to reject application');
      }
    });
  }


  download(filePath: string | undefined | null): void {
    if (!filePath) return alert('File not available');
    window.open('https://localhost:7034' + filePath, '_blank');
  }


  isProcessing(id: number): boolean {
    return this.processingIds.has(id);
  }
}
