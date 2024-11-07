import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() collapsed: boolean = false;
  currentRoute: string = '';

  menuItems = [
    { 
      name: 'Home',
      icon: 'home',
      route: '/dashboard/home'
    },
    { 
      name: 'News',
      icon: 'newspaper',
      route: '/dashboard/news'
    },
    { 
      name: 'Kanban',
      icon: 'view_column',
      route: '/dashboard/kanban'
    },
    { 
      name: 'Workspaces',
      icon: 'business_center',
      route: '/dashboard/workspaces'
    },
    { 
      name: 'Calendar',
      icon: 'calendar_today',
      route: '/dashboard/calendar'
    },
    { 
      name: 'Analytics',
      icon: 'bar_chart',
      route: '/dashboard/analytics'
    },
  ];

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }
}