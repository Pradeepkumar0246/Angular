import { Component, OnInit } from '@angular/core';
import { Userservice } from '../../services/user/userservice';
import { Departmentservice } from '../../services/department/departmentservice';
import { User } from '../../models/user.model';
import { Department } from '../../models/department.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usercomponent',
  imports:[CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './usercomponent.html',
  styleUrls: ['./usercomponent.css']
})
export class Usercomponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  departments: Department[] = [];
  selectedDepartmentId: number | null = null;
  roleFilter: 'All' | 'User' | 'Officer' | 'Admin' = 'All';
  isDepartmentFilterDisabled: boolean = false;

  showModal = false;
  isEditMode = false;
  currentUser: User = {
    userId: 0,
    name: '',
    email: '',
    role: '',
    contactNumber: '',
    departmentId: null
  };

  loading = false;
  notification: { message: string; type: 'success' | 'error' } | null = null;

  constructor(private userService: Userservice, private deptService: Departmentservice) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (res) => {
        console.log('Users loaded:', res);
        this.users = res;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.showNotification('Failed to load users', 'error');
        this.loading = false;
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
    this.filteredUsers = this.users.filter((u) => {
      const roleMatch = this.roleFilter === 'All' || u.role === this.roleFilter;
      const deptMatch = u.role === 'Officer' && this.selectedDepartmentId
        ? u.departmentId === this.selectedDepartmentId
        : true;
      return roleMatch && deptMatch;
    });
  }

  filterByRole(role: 'All' | 'User' | 'Officer' | 'Admin'): void {
  this.roleFilter = role;
  this.isDepartmentFilterDisabled = role !== 'Officer';
  if (this.isDepartmentFilterDisabled) this.selectedDepartmentId = null;
  this.applyFilters();
}


  onDepartmentChange(event: Event): void {
    const selectEl = event.target as HTMLSelectElement;
    this.selectedDepartmentId = selectEl.value ? +selectEl.value : null;
    this.applyFilters();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentUser = {
      userId: 0,
      name: '',
      email: '',
      role: '',
      contactNumber: '',
      departmentId: null
    };
    this.showModal = true;
  }

  openEditModal(user: User): void {
    this.isEditMode = true;
    this.currentUser = { ...user };
    this.showModal = true;
  }

  saveUser(): void {
    if (!this.currentUser.name || !this.currentUser.email || !this.currentUser.role) {
      this.showNotification('Name, Email, and Role are required', 'error');
      return;
    }

    if (this.currentUser.role === 'Officer' && !this.currentUser.departmentId) {
      this.showNotification('Officer must have a department', 'error');
      return;
    }

    const saveObservable = this.isEditMode
      ? this.userService.updateUser(this.currentUser)
      : this.addUserByRole(this.currentUser);

    saveObservable.subscribe({
      next: (res) => {
        if (this.isEditMode) {
          const index = this.users.findIndex(u => u.userId === this.currentUser.userId);
          if (index > -1) this.users[index] = { ...this.currentUser };
        } else {
          this.users.push(res);
        }
        this.applyFilters();
        this.showNotification(`User ${this.isEditMode ? 'updated' : 'added'} successfully`, 'success');
        this.showModal = false;
      },
      error: (err) => {
        console.error('Error saving user:', err);
        this.showNotification('Failed to save user', 'error');
      }
    });
  }

  private addUserByRole(user: User) {
    const dto: any = {
      name: user.name,
      email: user.email,
      password: 'Temp123!', 
      contactNumber: user.contactNumber,
      role: user.role,
      departmentId: user.role === 'Officer' ? user.departmentId : null
    };

    if (user.role === 'User') return this.userService.addUser(dto);
    if (user.role === 'Admin') return this.userService.addAdmin(dto);
    return this.userService.addOfficer(dto);
  }

  deleteUser(userId: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.userId !== userId);
        this.applyFilters();
        this.showNotification('User deleted successfully', 'success');
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.showNotification('Failed to delete user', 'error');
      }
    });
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.notification = { message, type };
    setTimeout(() => (this.notification = null), 3000);
  }

  getDepartmentName(deptId?: number | null): string {
    return this.departments.find(d => d.departmentId === deptId)?.name || 'No Department Allocated';
  }
}
