import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertsComponent } from '@/src/shared/components/ui/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule, 
    AlertsComponent
  ],
  template: `
    <app-alerts></app-alerts>
    <router-outlet></router-outlet>
  `,
})

export class AppComponent {
  title = 'taskflow-app';
}
