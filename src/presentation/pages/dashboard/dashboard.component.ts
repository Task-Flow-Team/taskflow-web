import { Component, OnInit } from '@angular/core';
import { AlertService } from '@/src/data/repositories/alert/alerts.service';
import { ModalConfig } from '@/src/shared/components/layout/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false;
  isModalOpen = false;

  modalConfig: ModalConfig = {
    size: 'md',
    title: 'Default Modal',
    type: 'default',
    centered: true,
    preventClose: false,
    fullscreen: false,
    showClose: true,
    backdrop: true,
    padding: true,
    closeOnClickOutside: true,
    closeOnEsc: true,
    customClass: ''
  }

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.showAlerts();
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  showAlerts() {
    this.alertService.info(
      "You're logged in as 'admin@admin.com'",
      "Welcome to the dashboard"
    );
  }

  openEmmitedModal(config: ModalConfig) {
    this.modalConfig = config; // Set the config received
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }
}