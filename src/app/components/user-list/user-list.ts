import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  searchText = '';

  showForm = false;

  isEditMode = false;

  user: any = {
    id: '',
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'Student',
    isActive: true
  };

  roles: string[] = [
    'Admin',
    'Faculty',
    'Student'
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    this.userService.getUsers(this.searchText)
      .subscribe({
        next: data => {
          this.users = data;
        },
        error: err => console.error(err)
      });

  }

  newUser(): void {

    this.user = {
      id: '',
      userName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: 'Student',
      isActive: true
    };

    this.isEditMode = false;

    this.showForm = true;

  }

  editUser(user: any): void {

    this.user = {
      ...user,
      password: '',
      confirmPassword: ''
    };

    this.isEditMode = true;

    this.showForm = true;

  }

  saveUser(): void {

    if (this.isEditMode) {

      const updateUser = {
        userName: this.user.userName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        role: this.user.role,
        isActive: this.user.isActive
      };

      this.userService.updateUser(this.user.id, updateUser)
        .subscribe({
          next: () => {
            this.showForm = false;
            this.loadUsers();
          },
          error: err => console.error(err)
        });

    }
    else {

      this.userService.createUser(this.user)
        .subscribe({
          next: () => {
            this.showForm = false;
            this.loadUsers();
          },
          error: err => console.error(err)
        });

    }

  }

  cancel(): void {
    this.showForm = false;
  }

  searchUsers(): void {
    this.loadUsers();
  }

  get isFormValid(): boolean {

    if (this.isEditMode) {

      return this.user.userName.trim().length > 0 &&
             this.user.email.trim().length > 0 &&
             this.user.role.trim().length > 0;

    }

    return this.user.userName.trim().length > 0 &&
           this.user.email.trim().length > 0 &&
           this.user.password.trim().length > 0 &&
           this.user.confirmPassword.trim().length > 0 &&
           this.user.role.trim().length > 0;

  }

}