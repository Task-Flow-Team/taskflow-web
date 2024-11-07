import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button
      (click)="toggleTheme()"
      class="relative mr-4 bg-white rounded-full min-w-9 min-h-9 flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95"
    >
      <mat-icon class="text-muted">dark_mode</mat-icon>
    </button>
  `,
})
export class ThemeToggleComponent {
  toggleTheme() {
    // Implement theme toggle logic
  }
}
