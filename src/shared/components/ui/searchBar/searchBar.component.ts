// src/shared/components/ui/searchBar/searchBar.component.ts
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="relative ml-4">
      <mat-icon 
        class="absolute left-3 top-1/2 -translate-y-1/2 text-muted !w-5 !h-5 !text-[20px] z-50"
      >
        search
      </mat-icon>
      <input
        type="text"
        spellcheck="false"
        class="w-64 pl-10 pr-4 py-2 bg-white rounded-full border-none shadow-sm text-sm text-muted-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:bg-gray-50"
        placeholder="Search anything..."
      />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    input {
      transition: all 0.2s ease-in-out;
    }

    input:focus {
      width: 300px;
    }

    /* Optimización de la animación */
    input {
      will-change: width;
      transform: translateZ(0);
      backface-visibility: hidden;
    }
  `]
})
export class SearchBarComponent {}