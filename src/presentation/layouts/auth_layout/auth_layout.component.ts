import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  template: `
    <div class="auth-layout">
      <div class="bg-pattern"></div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./auth_layout.component.scss'],
  standalone: false,
})
export class AuthLayoutComponent {}
