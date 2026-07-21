import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css'
})
export class DepartmentListComponent implements OnInit {

  departments: Department[] = [];
  isEditMode = false;
  showForm = false;
  searchText = '';
  department: Department = {
  id: '',
  departmentCode: '',
  departmentName: '',
  isActive: true
};

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments(this.searchText)
    .subscribe({
      next: data => {
        this.departments = data;
      },
      error: err => console.error(err)
    });
  }

  newDepartment(): void {
    this.department = {
  id: '',
  departmentCode: '',
  departmentName: '',
  isActive: true
};

    this.showForm = true;
  }

  saveDepartment(): void {

  if (this.isEditMode) {

    this.departmentService.updateDepartment(this.department.id, this.department)
      .subscribe({
        next: () => {
          this.showForm = false;
          this.loadDepartments();
        },
        error: err => console.error(err)
      });

  } else {

    this.departmentService.createDepartment(this.department)
      .subscribe({
        next: () => {
          this.showForm = false;
          this.loadDepartments();
        },
        error: err => console.error(err)
      });

  }
}

  cancel(): void {
    this.showForm = false;
  }
  editDepartment(department: Department): void {

  this.department = { ...department };

  this.isEditMode = true;

  this.showForm = true;

}
searchDepartments(): void {
  this.loadDepartments();
}
}