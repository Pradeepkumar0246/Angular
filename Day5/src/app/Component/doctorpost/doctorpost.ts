import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hospital } from '../../Models/Hospital.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DoctorserService } from '../../Service/doctor';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-doctorpost',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './doctorpost.html',
  styleUrl: './doctorpost.css',
})
export class DoctorpostComponent {
  form: FormGroup;
  id?: string;
  isEdit = false;
  hospitals: Hospital[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: DoctorserService
  ) {
    this.form = this.fb.group({
      doctorId: [''],
      name: ['', Validators.required],
      specialization: [''],

      hospitalId: [''],
    });
  }
  ngOnInit() {
    this.svc.getHospitals().subscribe((h) => (this.hospitals = h));
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) {
      this.isEdit = true;
      this.svc.getById(this.id).subscribe((d) => this.form.patchValue(d));
    }
  }
  save() {
    if (this.form.invalid) return;

    const val = this.form.value;
    if (this.isEdit) {
      this.svc.update(val).subscribe(() => this.router.navigate(['/doctors']));
    } else {
      const payload = {
        name: val.name,
        specialization: val.specialization,

        hospitalId: val.hospitalId,
      };
      this.svc.add(payload).subscribe(() => this.router.navigate(['/doctors']));
    }
  }
}
