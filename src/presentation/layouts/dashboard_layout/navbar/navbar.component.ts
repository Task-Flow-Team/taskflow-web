import { Component, Output, EventEmitter } from '@angular/core';
import { ModalConfig } from '@/src/shared/components/layout/modal/modal.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() menuToggled = new EventEmitter<void>();
  @Output() modalOpened = new EventEmitter<ModalConfig>();
  
  user = {
    name: 'Mr. Schmidt',
    avatar: 'assets/images/default_avatar.webp',
  };

  toggleSidebar() {
    this.menuToggled.emit();
  }

  handleModalOpen(config: ModalConfig) {
    this.modalOpened.emit(config);
  }
}