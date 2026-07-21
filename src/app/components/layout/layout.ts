import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    const modal = new bootstrap.Modal(
      document.getElementById('logoutModal')!
    );

    modal.show();
  }

  confirmLogout() {

    this.authService.logout();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById('logoutModal')!
    );

    modal?.hide();

    this.router.navigate(['/login']);
  }
}