import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

// Import your child components here
// import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // Define your child routes here
      // { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }