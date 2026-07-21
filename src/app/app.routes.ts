import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { LayoutComponent } from './components/layout/layout';
import { DepartmentListComponent } from './components/department-list/department-list';
import { authGuard } from './guards/auth-guard';
import { CourseListComponent } from './components/course-list/course-list';
import { UserListComponent } from './components/user-list/user-list';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: 'departments',
        component: DepartmentListComponent
      },
      {
    path: 'courses',
    component: CourseListComponent
},
{
  path: 'users',
  component: UserListComponent
},


      {
        path: '',
        redirectTo: 'departments',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];