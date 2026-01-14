import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Departmentservice } from '../../services/department/departmentservice';
import { Department, DepartmentPostDTO } from '../../models/department.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Departmentcomponent } from "../departmentcomponent/departmentcomponent";
import { Applicationcomponent } from "../applicationcomponent/applicationcomponent";
import { Formcomponent } from "../formcomponent/formcomponent";
import { Usercomponent } from "../usercomponent/usercomponent";

@Component({
  selector: 'app-admincomponent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Departmentcomponent, Applicationcomponent, Formcomponent, Usercomponent],
  templateUrl: './admincomponent.html',
  styleUrls: ['./admincomponent.css']
})
export class Admincomponent implements OnInit {
  selectedSection: string = 'users'; 
  adminUser: any;
  departments: Department[] = [];
  loadingDepartments = false;
  showNewDepartmentForm = false;
  newDepartment: DepartmentPostDTO = { name: '', description: '' };

  constructor(private router: Router, private departmentService: Departmentservice) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    this.adminUser = userJson ? JSON.parse(userJson) : null;
    if (this.selectedSection === 'departments') {
      this.loadDepartments();
    }
  }

  setSection(section: string): void {
    this.selectedSection = section;
    if (section === 'departments') {
      this.loadDepartments();
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  loadDepartments(): void {
    this.loadingDepartments = true;
    this.departmentService.getAllDepartments().subscribe({
      next: (res) => {
        this.departments = res;
        this.loadingDepartments = false;
      },
      error: () => {
        this.loadingDepartments = false;
      }
    });
  }

  addDepartment(): void {
    if (!this.newDepartment.name.trim()) return;
    this.departmentService.addDepartment(this.newDepartment).subscribe({
      next: () => {
        this.newDepartment = { name: '', description: '' };
        this.showNewDepartmentForm = false;
        this.loadDepartments();
      }
    });
  }

  deleteDepartment(id: number): void {
    if (!confirm('Are you sure you want to delete this department?')) return;
    this.departmentService.deleteDepartment(id).subscribe({
      next: () => this.loadDepartments()
    });
  }

  editDepartment(dep: Department): void {
    const updatedName = prompt('Enter new name:', dep.name);
    if (updatedName !== null) {
      const updatedDept: Department = { ...dep, name: updatedName };
      this.departmentService.updateDepartment(updatedDept).subscribe({
        next: () => this.loadDepartments()
      });
    }
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/profile']);
  }
}
