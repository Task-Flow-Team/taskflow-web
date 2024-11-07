import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { AlertService } from '@/src/data/repositories/alert/alerts.service';
import { Alert } from '@/src/core/domain/models';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="alerts-wrapper fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      @for (alert of alerts; track alert.id) {
        <div 
          [@alertAnimation]="'visible'"
          class="alert-item flex items-center min-w-[20rem] p-4 rounded-lg shadow-lg bg-opacity-10 border-2 border-opacity-35"
          [ngClass]="getSeverityClass(alert)"
        >
          <mat-icon class="mr-3" [ngClass]="getIconClass(alert)">{{alert.icon}}</mat-icon>
          <div class="flex-1">
            @if (alert.summary) {
              <div class="font-semibold">{{alert.summary}}</div>
            }
            <div class="text-sm text-gray-600">{{alert.detail}}</div>
          </div>
          @if (alert.closable) {
            <button 
              (click)="removeAlert(alert)"
              class="ml-4 hover:opacity-75 transition-opacity"
            >
              <mat-icon>close</mat-icon>
            </button>
          }
          @if (!alert.sticky) {
            <div 
              class="progress-bar absolute bottom-0 left-0 h-1 bg-white/20"
              [style.animation-duration.ms]="alert.life"
            ></div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .alert-item {
      max-width: 90vw;
    }

    .progress-bar {
      animation: progress linear forwards;
      width: 100%;
    }

    @keyframes progress {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }

    :host {
      display: block;
    }
  `],
  animations: [
    trigger('alertAnimation', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => visible', animate('150ms ease-out')),
      transition('visible => void', animate('150ms ease-in'))
    ])
  ]
})
export class AlertsComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription.add(
      this.alertService.alerts$.subscribe(alert => {
        this.alerts.unshift(alert);
        if (!alert.sticky) {
          setTimeout(() => {
            this.removeAlert(alert);
          }, alert.life);
        }
      })
    );

    this.subscription.add(
      this.alertService.clear$.subscribe(key => {
        if (key === 'all') {
          this.alerts = [];
        } else {
          this.alerts = this.alerts.filter(n => n.key !== key);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    const index = this.alerts.indexOf(alert);
    if (index > -1) {
      this.alerts.splice(index, 1);
    }
  }

  getSeverityClass(alert: Alert): string {
    const baseClasses = '';
    
    switch (alert.severity) {
      case 'success':
        return `${baseClasses} bg-green-100 border-green-600 text-green-600`;
      case 'info':
        return `${baseClasses} bg-blue-100 border-blue-600 text-blue-600`;
      case 'warn':
        return `${baseClasses} bg-yellow-100 border-yellow-600 text-yellow-600`;
      case 'error':
        return `${baseClasses} bg-red-100 border-red-600 text-red-600`;
      default:
        return `${baseClasses} bg-gray-100 border-gray-600 text-gray-600`;
    }
  }

  getIconClass(alert: Alert): string {
    const baseClasses = '';
    
    switch (alert.severity) {
      case 'success':
        return `${baseClasses} text-green-600`;
      case 'info':
        return `${baseClasses} text-blue-600`;
      case 'warn':
        return `${baseClasses} text-yellow-600`;
      case 'error':
        return `${baseClasses} text-red-600`;
      default:
        return `${baseClasses} text-gray-600`;
    }
  }

}