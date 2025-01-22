import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
  NavbarComponent,
  SidebarComponent,
} from '../index';
import { LanguageSelectorComponent } from '@/src/shared/components/ui/languageSelector/languageSelector.component';
import { NotificationsToggleComponent } from '@/src/shared/components/ui/notificationsMenu/notificationsMenu.component';
import { SearchBarComponent } from '@/src/shared/components/ui/searchBar/searchBar.component';
import { ThemeToggleComponent } from '@/src/shared/components/ui/themeSwitcher/themeSwitcher.component';
import { UserMenuComponent } from '@/src/shared/components/ui/userMenu/userMenu.component';
import { ModalComponent } from '@/src/shared/components/layout/modal/modal.component';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroBell,
  heroMegaphone,
  heroBars3CenterLeft,
  heroLanguage,
  heroClipboardDocumentCheck,
} from '@ng-icons/heroicons/outline';

import {
  bootstrapHouse,
  bootstrapCollection,
  bootstrapCalendar4Week,
  bootstrapBarChartLine,
} from '@ng-icons/bootstrap-icons';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "@/src/presentation/services/user.service";

const bootstrapIcons = {
  bootstrapHouse,
  bootstrapCollection,
  bootstrapCalendar4Week,
  bootstrapBarChartLine,
};

const heroIcons = {
  heroBell,
  heroMegaphone,
  heroBars3CenterLeft,
  heroLanguage,
  heroClipboardDocumentCheck,
};

@NgModule({
  declarations: [DashboardComponent, SidebarComponent, NavbarComponent],
  providers:[
    UserService
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    SearchBarComponent,
    LanguageSelectorComponent,
    ThemeToggleComponent,
    NotificationsToggleComponent,
    UserMenuComponent,
    ModalComponent,
    HttpClientModule,
    NgIconsModule.withIcons({
      ...heroIcons,
      ...bootstrapIcons,
    }),
  ],
})
export class DashboardModule {}
