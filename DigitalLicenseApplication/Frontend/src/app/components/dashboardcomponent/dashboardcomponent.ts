import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../models/application.model';
import { Forms } from '../../models/form.model';
import { User } from '../../models/user.model';
import { Userservice } from '../../services/user/userservice';
import { Authservice } from '../../services/auth/authservice';
import { Formservice } from '../../services/form/formservice';
import { Applicationservice } from '../../services/application/applicationservice';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './dashboardcomponent.html',
  styleUrls: ['./dashboardcomponent.css'],
})
export class Dashboardcomponent implements OnInit {
  user: User | null = null;
  availableForms: Forms[] = [];
  submittedApplications: Application[] = [];
  loadingForms = true;
  loadingApplications = false;
  errorMessage: string = '';
  showForms: boolean = true;

  constructor(
    private authService: Authservice,
    private formService: Formservice,
    private userService: Userservice,
    private applicationService: Applicationservice,
    private router: Router
  ) {}

ngOnInit(): void {
  this.user = this.authService.getUser();

  
  if (this.user) {
    this.userService.getUserById(this.user.userId).subscribe({
      next: (res) => {
        this.user = res;
        if (this.user.profileImage) {
          this.user.profileImageUrl =
            'data:image/png;base64,' + this.user.profileImage;
        }
        this.loadFormsAndApplications();
      },
      error: () => (this.errorMessage = 'Failed to load user data'),
    });
  }
  else {
    
    this.loadFormsAndApplications();
  }
}



  loadFormsAndApplications(): void {
    this.loadingForms = true;
    this.loadingApplications = true;

    
    this.formService.getAllForms().subscribe({
      next: (forms) => {
        console.log('Forms fetched:', forms);
        this.availableForms = forms;
        if (this.user?.userId) {
          this.applicationService
            .getApplicationsByUser(this.user.userId)
            .subscribe({
              next: (apps) => {
                this.submittedApplications = apps.map((app) => {
                  const matchingForm = forms.find((f) => f.formId === app.formId);
                  return {
                    ...app,
                    form: matchingForm || app.form,
                    submittedDate: new Date(app.submittedDate).toString(),
                  };
                });
                this.loadingForms = false;
                this.loadingApplications = false;
              },
              error: () => {
                this.errorMessage = 'Failed to load applications';
                this.loadingApplications = false;
              },
            });
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load forms';
        this.loadingForms = false;
      },
    });
  }

  showFormsSection(): void {
    this.showForms = true;
  }
  showApplicationsSection(): void {
    if (!this.user) {
    this.router.navigate(['/login']);
    return;
  }
    this.showForms = false;
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/profile']);
  }

  logout(): void {
    this.authService.logout();
  }

  submitForm(form: Forms): void {
    if (!this.user) {
    this.router.navigate(['/login']);
    return;
  }
    this.router.navigate(['/dashboard/submit/', form.formId], { state: { form } });
  }

  deleteApplication(app: Application): void {
    if (!confirm('Are you sure you want to delete this application?')) return;
    this.applicationService.deleteApplication(app.applicationId).subscribe({
      next: () => {
        this.submittedApplications = this.submittedApplications.filter(
          (a) => a.applicationId !== app.applicationId
        );
      },
      error: () => (this.errorMessage = 'Failed to delete application'),
    });
  }
  goToLogin(): void {
  this.router.navigate(['/login']);
}

goToRegister(): void {
  this.router.navigate(['/register']);
}

  

  downloadPDF(app: Application): void {
    if (!this.user) return;

    const doc = new jsPDF();
    let y = 10;

    
    if (this.user.profileImage) {
      const img = new Image();
      img.src = 'data:image/png;base64,' + this.user.profileImage;
      doc.addImage(img, 'PNG', 150, 10, 40, 40);
    }

    doc.setFontSize(16);
    doc.text('Digital License Approval', 10, y);
    y += 10;
    doc.setFontSize(12);

    doc.text(`Full Name: ${app.fullName}`, 10, y);
    y += 7;
    doc.text(`Father Name: ${app.fatherName}`, 10, y);
    y += 7;
    doc.text(`Government ID Type: ${app.governmentIdType}`, 10, y);
    y += 7;
    doc.text(`Marital Status: ${app.maritalStatus}`, 10, y);
    y += 7;
    doc.text(`Gender: ${app.gender}`, 10, y);
    y += 7;
    doc.text(`Physically Disabled: ${app.physicallyDisabled ? 'Yes' : 'No'}`, 10, y);
    y += 7;
    doc.text(`Permanent Address: ${app.permanentAddress}`, 10, y);
    y += 7;
    doc.text(`Status: ${app.status}`, 10, y);
    if (app.status === 'Rejected' && app.rejectionReason) {
      y += 7;
      doc.setTextColor(255, 0, 0);
      doc.text(`Rejected: ${app.rejectionReason}`, 10, y);
      doc.setTextColor(0, 0, 0);
    }

    doc.save(`Application_${app.applicationId}.pdf`);
  }
}
