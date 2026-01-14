import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Department, DepartmentPostDTO } from '../../models/department.model';
import { Departmentservice } from '../../services/department/departmentservice';

@Component({
  selector: 'app-departmentcomponent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departmentcomponent.html',
  styleUrls: ['./departmentcomponent.css']
})
export class Departmentcomponent implements OnInit {

  departments: Department[] = [];
  addingNew = false;
  newDepartment: DepartmentPostDTO = { name: '', description: '' };

  editingDepartmentId: number | null = null;
  editDepartment: DepartmentPostDTO = { name: '', description: '' };

  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private departmentService: Departmentservice) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: res => this.departments = res,
      error: () => this.showMessage('Failed to load departments', 'error')
    });
  }

  showAddRow(): void {
    this.addingNew = true;
    this.newDepartment = { name: '', description: '' };
  }

  cancelAdd(): void {
    this.addingNew = false;
  }

  addDepartment(): void {
    if (!this.newDepartment.name.trim()) return;
    this.departmentService.addDepartment(this.newDepartment).subscribe({
      next: res => {
        this.departments.unshift(res);
        this.addingNew = false;
        this.showMessage('Department added successfully', 'success');
      },
      error: (err) => this.showMessage(err.error?.message || 'Failed to add department', 'error')
    });
  }

  startEdit(dept: Department): void {
    this.editingDepartmentId = dept.departmentId;
    this.editDepartment = { name: dept.name, description: dept.description || '' };
  }

  cancelEdit(): void {
    this.editingDepartmentId = null;
  }

  updateDepartment(dept: Department): void {
    const updated: Department = {
      departmentId: dept.departmentId,
      name: this.editDepartment.name,
      description: this.editDepartment.description
    };
    this.departmentService.updateDepartment(updated).subscribe({
      next: () => {
        dept.name = updated.name;
        dept.description = updated.description;
        this.editingDepartmentId = null;
        this.showMessage('Department updated successfully', 'success');
      },
      error: (err) => this.showMessage(err.error?.message || 'Failed to update department', 'error')
    });
  }

  confirmDelete(dept: Department): void {
    if (window.confirm(`Are you sure you want to delete "${dept.name}"?`)) {
      this.deleteDepartment(dept);
    }
  }

  deleteDepartment(dept: Department): void {
    this.departmentService.deleteDepartment(dept.departmentId).subscribe({
      next: () => {
        this.departments = this.departments.filter(d => d.departmentId !== dept.departmentId);
        this.showMessage('Department deleted successfully', 'success');
      },
      error: (err: any) => this.showMessage(err.error?.message || 'Cannot delete department', 'error')
    });
  }

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => this.message = '', 3000);
  }

}
