import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Forms } from '../../models/form.model';
import { Applicationservice } from '../../services/application/applicationservice';
import { Authservice } from '../../services/auth/authservice';
import { Formservice } from '../../services/form/formservice';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-submitcomponent',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './submitcomponent.html',
  styleUrls: ['./submitcomponent.css'],
})
export class Submitcomponent implements OnInit {
  form: Forms | null = null;
  userId: number | null = null;

  fullName: string = '';
  fatherName: string = '';
  governmentIdType: string = '';
  maritalStatus: string = '';
  gender: string = '';
  physicallyDisabled: boolean = false;
  permanentAddress: string = '';
  details: string = '';

  governmentIdFile: File | null = null;
  physicallyDisabledFile: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  uploading: boolean = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: Authservice,
    private applicationService: Applicationservice,
    private formService: Formservice,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.form = navigation?.extras?.state?.['form'] || history.state?.form || null;

    if (!this.form) {
      this.router.navigate(['/dashboard']);
      return;
    }

    const user = this.authService.getUser();
    this.userId = user?.userId || null;
  }

  onFileChange(event: any, type: string) {
    const file = event.target.files[0] || null;
    if (type === 'gov') this.governmentIdFile = file;
    if (type === 'phys') this.physicallyDisabledFile = file;
  }

  submitApplication(): void {
    if (
      !this.userId ||
      !this.form ||
      !this.fullName ||
      !this.fatherName ||
      !this.governmentIdType ||
      !this.maritalStatus ||
      !this.gender ||
      !this.permanentAddress ||
      !this.governmentIdFile
    ) {
      this.errorMessage =
        'Please fill all required fields and upload required documents.';
      return;
    }

    this.uploading = true;

    const payload = {
      UserId: this.userId,
      FormId: this.form.formId,
      DepartmentId: this.form.departmentId || 1,
      Details: this.details,
      FullName: this.fullName,
      FatherName: this.fatherName,
      GovernmentIdType: this.governmentIdType,
      UploadedIdProofPath: '', 
      MaritalStatus: this.maritalStatus,
      Gender: this.gender,
      PhysicallyDisabled: this.physicallyDisabled,
      PhysicallyDisabledProofPath: '', 
      PermanentAddress: this.permanentAddress,
    };
    console.log('Payload to submit:', payload);

    var govFormData = new FormData();
    
    Object.keys(payload).forEach(keyName => {
      let objValue = payload[keyName as keyof typeof payload];
      govFormData.append(keyName, objValue.toString());
    })
    
    govFormData.append("GovernmentIdProof",this.governmentIdFile)
  
    this.applicationService.submitApplication(govFormData).subscribe({
      next: (app: any) => {
        console.log("I am completed")
        this.successMessage='Successfully Applyed';
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.uploading = false;
        this.errorMessage = 'Failed to register';
      },
    });
  }
  cancel(): void {
  this.router.navigate(['/dashboard']);
}
  private finalizeApplication(applicationId: number, govPath: string, physPath: string) {
    const updatePayload = {
      uploadedIdProofPath: govPath,
      governmentIdProof: this.governmentIdFile?.name,
      physicallyDisabledProofPath: physPath || null,
    };

    this.applicationService.updateApplication(applicationId, updatePayload).subscribe({
      next: () => {
        this.uploading = false;
        this.successMessage = 'Application submitted successfully!';
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: () => {
        this.uploading = false;
        this.errorMessage = 'Failed to update application with uploaded file paths.';
      },
    });
  }
}
