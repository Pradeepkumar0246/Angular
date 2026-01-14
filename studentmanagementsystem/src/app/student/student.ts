import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../student.model';


@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class Students implements OnInit {
  students: Student[] = [
    { name: 'Abdul', roll: '101', subjects: ['Math', 'Science'], marks: [85, 90] },
    { name: 'Babu', roll: '102', subjects: ['Math', 'Science'], marks: [75, 80] },
    { name: 'Charan', roll: '103', subjects: ['Math', 'Science'], marks: [65, 70] }
  ];

  searchText: string = '';
  filteredStudents: Student[] = [];
  newstudent: Student = { name: '', roll: '', subjects: [], marks: [] };
  editstudent: Student | null = null;

  ngOnInit() {
    this.filterStudents();
  }

  getgrade(marks: number): string {
    if (marks >= 90) return 'A';
    else if (marks >= 80) return 'B';
    else if (marks >= 70) return 'C';
    else if (marks >= 60) return 'D';
    else return 'F';
  }

  gettotalmarks(marks: number[]): number {
    return marks.reduce((a, b) => a + b, 0);
  }

  getaverage(marks: number[]): number {
    return marks.length > 0 ? this.gettotalmarks(marks) / marks.length : 0;
  }

  getperformance(marks: number[]): string {
    const avg = this.getaverage(marks);
    if (avg >= 90) return 'Excellent';
    else if (avg >= 75) return 'Good';
    else if (avg >= 60) return 'Average';
    else return 'Poor';
  }

  addstudent() {
    const subjectsArray = typeof this.newstudent.subjects === 'string'
      ? (this.newstudent.subjects as unknown as string).split(',').map(s => s.trim())
      : this.newstudent.subjects;

    const marksArray = typeof this.newstudent.marks === 'string'
      ? (this.newstudent.marks as unknown as string).split(',').map(m => Number(m.trim()))
      : this.newstudent.marks;

    const total = this.gettotalmarks(marksArray);
    const average = this.getaverage(marksArray);
    const grade = this.getgrade(average);
    const performance = this.getperformance(marksArray);

    const newStudent: Student = {
      name: this.newstudent.name,
      roll: this.newstudent.roll,
      subjects: subjectsArray,
      marks: marksArray,
      total,
      average,
      grade,
      performance
    };
    this.students.push(newStudent);
    this.filterStudents();
    this.newstudent = { name: '', roll: '', subjects: [], marks: [] };
  }
  editStudent(roll: string) {
    const student = this.students.find(s => s.roll === roll);
    if (student) {
      this.editstudent = { ...student };
    }
  }

  cancleEdit() {
    this.editstudent = null;
  }

  updateStudent() {
    if (this.editstudent) {
      const subjectsArray = typeof this.editstudent.subjects === 'string'?(this.editstudent.subjects as unknown as string).split(',').map(s => s.trim())
        : this.editstudent.subjects;
      const marksArray = typeof this.editstudent.marks === 'string'?(this.editstudent.marks as unknown as string).split(',').map(m => Number(m.trim()))
        : this.editstudent.marks;
      this.editstudent.subjects = subjectsArray;
      this.editstudent.marks = marksArray;
      this.editstudent.total = this.gettotalmarks(marksArray);
      this.editstudent.average = this.getaverage(marksArray);
      this.editstudent.grade = this.getgrade(this.editstudent.average);
      this.editstudent.performance = this.getperformance(marksArray);
      const index = this.students.findIndex(s => s.roll === this.editstudent!.roll);
      if (index !== -1) {
        this.students[index] = { ...this.editstudent };
      }
      this.editstudent = null;
      this.filterStudents();
    }
  }

  deleteStudent(roll: string) {
    if (!confirm('Are you sure to delete this student?')) return;
    this.students = this.students.filter(s => s.roll !== roll);
    this.filterStudents();
  }

  filterStudents() {
    if (this.searchText.trim() === '') {
      this.filteredStudents = this.students;
    } else {
      const search = this.searchText.toLowerCase();
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(search) ||
        student.roll.toLowerCase().includes(search)
      );
    }
  }
}
