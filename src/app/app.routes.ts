import { Routes } from '@angular/router';
import { NotFoundComponent } from '../presentation/pages/not-found/not-found.component';
import { LandingPageComponent } from '../presentation/pages/landing/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'auth', loadChildren: () => import('../presentation/pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('../presentation/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', component: NotFoundComponent },
];
