import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button
    class="relative mr-4 bg-white rounded-full min-w-9 min-h-9 flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95"
    (click)="changeLanguage()"
    >
      <mat-icon class="text-muted">translate</mat-icon>
    </button>
  `,
})
export class LanguageSelectorComponent {
  changeLanguage() {
    // Implement language change logic
  }
}
