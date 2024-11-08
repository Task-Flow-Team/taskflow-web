import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { getIconColors } from '@/src/shared/utils';


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
      icon: 'bootstrapHouse',
      route: '/dashboard/home',
      colors: {
        stroke: 'indigo',
        fill: 'indigo',
      },
    },
    {
      name: 'Workspaces',
      icon: 'bootstrapCollection',
      route: '/dashboard/workspaces',
      colors: {
        stroke: 'purple',
        fill: 'purple',
      },
    },
    {
      name: 'Tasks',
      icon: 'heroClipboardDocumentCheck',
      route: '/dashboard/tasks',
      colors: {
        stroke: 'green',
        fill: 'green', // Para HeroIcons usamos 'none' para fill
      },
    },
    {
      name: 'News',
      icon: 'heroMegaphone',
      route: '/dashboard/news',
      colors: {
        stroke: 'yellow',
        fill: 'yellow', // HeroIcon
      },
    },
    {
      name: 'Calendar',
      icon: 'bootstrapCalendar4Week',
      route: '/dashboard/calendar',
      colors: {
        stroke: 'teal',
        fill: 'teal',
      },
    },
    {
      name: 'Analytics',
      icon: 'bootstrapBarChartLine',
      route: '/dashboard/analytics',
      colors: {
        stroke: 'violet',
        fill: 'violet',
      },
    },
  ];

  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }

  public getIconColors = getIconColors;

}
