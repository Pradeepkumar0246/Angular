import { Component, OnInit } from '@angular/core';
import { Formservice } from '../../services/form/formservice';
import { Departmentservice } from '../../services/department/departmentservice';
import { Forms } from '../../models/form.model';
import { Department } from '../../models/department.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formcomponent',
  imports: [CommonModule, FormsModule],
  templateUrl: './formcomponent.html',
  styleUrls: ['./formcomponent.css']
})
export class Formcomponent implements OnInit {
  forms: Forms[] = [];
  departments: Department[] = [];
  filteredForms: Forms[] = [];
  selectedDepartmentId: number | null = null;
  loading = false;
  notification: { message: string; type: 'success' | 'error' } | null = null;

  // Form modal variables
  showModal = false;
  isEditMode = false;
  currentForm: Forms = { formId: 0, title: '', description: '', departmentId: null, department: null };

  constructor(private formService: Formservice, private deptService: Departmentservice) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadForms();
  }

  loadForms(): void {
    this.loading = true;
    this.formService.getAllForms().subscribe({
      next: (res) => {
        this.forms = res;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showNotification('Failed to load forms', 'error');
      }
    });
  }

  loadDepartments(): void {
    this.deptService.getAllDepartments().subscribe({
      next: (res) => (this.departments = res),
      error: () => this.showNotification('Failed to load departments', 'error')
    });
  }

  applyFilters(): void {
    this.filteredForms = this.forms.filter((f) =>
      this.selectedDepartmentId ? f.departmentId === this.selectedDepartmentId : true
    );
  }

  onDepartmentChange(event: Event): void {
    const selectEl = event.target as HTMLSelectElement;
    const value = selectEl.value;
    this.selectedDepartmentId = value ? +value : null;
    this.applyFilters();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentForm = { formId: 0, title: '', description: '', departmentId: null, department: null };
    this.showModal = true;
  }

  openEditModal(form: Forms): void {
    this.isEditMode = true;
    this.currentForm = { ...form };
    this.showModal = true;
  }

  saveForm(): void {
    if (!this.currentForm.title || !this.currentForm.departmentId) {
      this.showNotification('Title and Department are required', 'error');
      return;
    }

    if (this.isEditMode) {
      this.formService.updateForm(this.currentForm.formId, this.currentForm).subscribe({
        next: () => {
          // Update locally with the full department info
          const dept = this.departments.find(d => d.departmentId === this.currentForm.departmentId) || null;
          const index = this.forms.findIndex(f => f.formId === this.currentForm.formId);
          if (index > -1) this.forms[index] = { ...this.currentForm, department: dept };
          this.applyFilters();
          this.showNotification('Form updated successfully', 'success');
          this.showModal = false;
        },
        error: () => this.showNotification('Failed to update form', 'error')
      });
    } else {
      this.formService.addForm(this.currentForm).subscribe({
        next: (res) => {
          // Immediately assign department object for display
          const dept = this.departments.find(d => d.departmentId === res.departmentId) || null;
          this.forms.push({ ...res, department: dept });
          this.applyFilters();
          this.showNotification('Form added successfully', 'success');
          this.showModal = false;
        },
        error: () => this.showNotification('Failed to add form', 'error')
      });
    }
  }

  deleteForm(formId: number): void {
    if (!confirm('Are you sure you want to delete this form?')) return;
    this.formService.deleteForm(formId).subscribe({
      next: () => {
        this.forms = this.forms.filter(f => f.formId !== formId);
        this.applyFilters();
        this.showNotification('Form deleted successfully', 'success');
      },
      error: () => this.showNotification('Failed to delete form', 'error')
    });
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.notification = { message, type };
    setTimeout(() => (this.notification = null), 3000);
  }
}
