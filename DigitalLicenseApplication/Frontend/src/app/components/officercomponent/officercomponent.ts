import { Component, OnInit } from '@angular/core';
import { OfficerService } from '../../services/officer/officer-service';
import { Authservice } from '../../services/auth/authservice';
import { Application } from '../../models/application.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Userservice } from '../../services/user/userservice';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-officercomponent',
  imports:[CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './officercomponent.html',
  styleUrls: ['./officercomponent.css']
})
export class Officercomponent implements OnInit {
  applications: Application[] = [];
  departmentId: number | null = null;
  filterStatus: string = ''; 
  loading = false;
  errorMessage = '';

  rejectionReasons: Record<number, string> = {};

  processingIds = new Set<number>();

  user: any | null = null;

  constructor(
    private officerService: OfficerService,
    private authService: Authservice,
        private userService: Userservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.departmentId = this.user?.departmentId ?? null;

    if (!this.departmentId) {
      this.router.navigate(['/dashboard']);
      return;
    }
    const userJson = this.authService.getUser();
        if (!userJson) {
          this.router.navigate(['/login']);
          return;
        }
    
        this.userService.getUserById(userJson.userId).subscribe({
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

    this.loadApplications();
  }

  loadApplications(): void {
    if (!this.departmentId) return;
    this.loading = true;
    this.errorMessage = '';
    this.officerService.getDepartmentApplications(this.departmentId, this.filterStatus).subscribe({
      next: (apps) => {
        this.applications = apps || [];
        for (const a of this.applications) {
          this.rejectionReasons[a.applicationId] = this.rejectionReasons[a.applicationId] ?? '';
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to load applications';
        console.error(err);
      }
    });
  }

  gotoAll(): void {
    this.filterStatus = '';
    this.loadApplications();
  }

  applyFilter(status: string): void {
    this.filterStatus = status;
    this.loadApplications();
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
    if (!filePath) {
      alert('File not available');
      return;
    }
    this.officerService.downloadDocument(filePath);
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/profile']);
  }

  logout(): void {
    this.authService.logout();
  }

  isProcessing(id: number): boolean {
    return this.processingIds.has(id);
  }
}
