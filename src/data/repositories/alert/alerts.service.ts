// src/shared/services/notification.service.ts
import { Alert } from '@/src/core/domain/models';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  
  // Create observables for alerts and clear
  private alertsSubject = new Subject<Alert>();
  private clearSubject = new Subject<string>();

  // Expose observables for alerts and clear
  alerts$ = this.alertsSubject.asObservable();
  clear$ = this.clearSubject.asObservable();

  // Expose methods for showing alerts
  show(alert: Alert) {
    // Generate a unique id if not provided
    if (!alert.id) alert.id = this.generateId();

    // Set default lifetime if not provided
    if (alert.life === undefined) alert.life = 3000;

    // Set default closable if not provided
    if (alert.closable === undefined)  alert.closable = true;

    if(alert.position === undefined) alert.position = 'top-right';

    // Set default sticky if not provided
    this.alertsSubject.next(alert);
  }

  // Expose method for clearing alerts
  clear(key?: string) {
    this.clearSubject.next(key || 'all');
  }

  // Expose methods for showing success alerts
  success(detail: string, summary?: string) {
    this.show({
      severity: 'success',
      summary: summary || 'Success',
      detail,
      icon: 'check_circle',
    });
  }

  // Expose methods for showing info alerts
  info(detail: string, summary?: string) {
    this.show({
      severity: 'info',
      summary: summary || 'Information',
      detail,
      icon: 'info',
    });
  }

  // Expose methods for showing warn alerts
  warn(detail: string, summary?: string) {
    this.show({
      severity: 'warn',
      summary: summary || 'Warning',
      detail,
      icon: 'warning',
    });
  }

  // Expose methods for showing error alerts
  error(detail: string, summary?: string) {
    this.show({
      severity: 'error',
      summary: summary || 'Error',
      detail,
      icon: 'error',
    });
  }

  // Generate a unique id for a alert
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
