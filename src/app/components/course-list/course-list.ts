import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css']
})
export class CourseListComponent {
courses: Course[] = [];

  departments: Department[] = [];

  isEditMode = false;

  showForm = false;

  searchText = '';

  course: Course = {
    id: '',
    courseCode: '',
    courseName: '',
    departmentId: '',
    isActive: true
  };

  constructor(
    private courseService: CourseService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {

    this.loadCourses();

    this.loadDepartments();

  }

  loadCourses(): void {

    this.courseService.getCourses(this.searchText)
      .subscribe({
        next: data => {
          this.courses = data;
        },
        error: err => console.error(err)
      });

  }

  loadDepartments(): void {

    this.departmentService.getDepartments('')
      .subscribe({
        next: data => {
          this.departments = data.filter(x => x.isActive);
        },
        error: err => console.error(err)
      });

  }

  newCourse(): void {

    this.course = {
      id: '',
      courseCode: '',
      courseName: '',
      departmentId: '',
      isActive: true
    };

    this.isEditMode = false;

    this.showForm = true;

  }

  saveCourse(): void {

    if (this.isEditMode) {

      this.courseService
        .updateCourse(this.course.id, this.course)
        .subscribe({
          next: () => {
            this.showForm = false;
            this.loadCourses();
          },
          error: err => console.error(err)
        });

    }
    else {

      this.courseService
        .createCourse(this.course)
        .subscribe({
          next: () => {
            this.showForm = false;
            this.loadCourses();
          },
          error: err => console.error(err)
        });

    }

  }

  editCourse(course: Course): void {

    this.course = { ...course };

    this.isEditMode = true;

    this.showForm = true;

  }

  cancel(): void {

    this.showForm = false;

  }

  searchCourses(): void {

    this.loadCourses();

  }

  get isFormValid(): boolean {

    return this.course.courseCode.trim().length > 0 &&
      this.course.courseName.trim().length > 0 &&
      this.course.departmentId.length > 0;

  }

}