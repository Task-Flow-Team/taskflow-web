import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notifications-toggle',
  standalone: true,
  imports: [MatIconModule, NgIf],
  template: `
    <button
      (click)="viewNotifications()"
      class="relative mr-4 bg-white rounded-full min-w-9 min-h-9 flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95"
    >
      <mat-icon 
        class="text-muted" 
        [class.shake-bell]="unreadCount > 0"
      >
        notifications
      </mat-icon>
      <span
        *ngIf="unreadCount > 0"
        class="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-purple-500 rounded-full pulse-dot"
      >
        <span
          class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-400 opacity-75 pulse-ring"
        ></span>
      </span>
    </button>
  `,
  styles: [`
    .shake-bell {
      animation: shake 4s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
      transform-origin: top center;
    }

    .pulse-dot {
      z-index: 10;
    }

    .pulse-ring {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes shake {
      0%, 50%, 100% {
        transform: rotate(0);
      }

      53%, 57% {
        transform: rotate(12deg);
      }

      55%, 59% {
        transform: rotate(-12deg);
      }

      61% {
        transform: rotate(0);
      }
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      50% {
        transform: scale(2.5);
        opacity: 0;
      }

      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
  `],
})
export class NotificationsToggleComponent implements OnInit {
  unreadCount = 5;

  ngOnInit() {
    if (this.unreadCount > 0) {
      this.startShakingAnimation();
    }
  }

  startShakingAnimation() {
    // Implementa lógica adicional si necesitas controlar la animación
  }

  viewNotifications() {
    // Implement notifications logic
  }
}