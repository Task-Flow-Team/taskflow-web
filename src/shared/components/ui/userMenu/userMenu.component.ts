import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ModalConfig } from '../../layout/modal/modal.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="flex items-center gap-4">
      <!-- User Avatar and Name -->
      <div
        class="relative flex items-center cursor-pointer"
        (click)="toggleMenu()"
      >
        <img
          [src]="user.avatar"
          alt="User Avatar"
          class="h-8 w-8 rounded-full mr-2"
        />
        <span class="text-muted-dark">{{ user.name }}</span>
        <mat-icon class="text-muted ml-1">expand_more</mat-icon>
      </div>

      <!-- Settings -->
      <button
        (click)="openSettings()"
        class="relative mr-4 bg-white rounded-full min-w-9 min-h-9 flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95"
      >
        <mat-icon class="text-muted spin-slow">settings</mat-icon>
      </button>
    </div>

    <!-- Dropdown Menu -->
    <div
      *ngIf="isMenuOpen"
      class="absolute right-10 top-16 w-56 bg-white rounded-xl shadow-lg py-2 z-50 dropdown-menu"
    >
      <!-- User Info Section -->
      <div class="px-4 py-3 border-b border-gray-100">
        <p class="text-sm font-medium text-gray-700">Signed in as</p>
        <p class="text-sm text-muted-dark truncate">{{ user.name }}</p>
      </div>

      <!-- Main Menu Items -->
      <div class="py-1">
        <a
          *ngFor="let item of menuItems"
          href="#"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors gap-3"
          [class.text-red-600]="item.danger"
        >
          <mat-icon class="text-muted !text-[18px]">{{ item.icon }}</mat-icon>
          {{ item.label }}
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .spin-slow {
        animation: spin 8s linear infinite;
      }

      .dropdown-menu {
        animation: dropdownIn 0.2s ease-out;
        transform-origin: top right;
      }

      @keyframes dropdownIn {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .spin-slow,
      .dropdown-menu {
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
    `,
  ],
})
export class UserMenuComponent {
  @Input() user: { name: string; avatar: string; email?: string } = {
    name: '',
    avatar: '',
    email: 'user@example.com',
  };

  isMenuOpen = false;

  @Output() openModal = new EventEmitter<ModalConfig>();

  menuItems = [
    { label: 'Profile', icon: 'person_outline' },
    { label: 'Dashboard', icon: 'dashboard' },
    { label: 'Workspaces', icon: 'folder_open' },
    { label: 'Tasks', icon: 'task' },
    {
      label: 'Help & Support',
      icon: 'help_outline',
    },
    {
      label: 'Sign out',
      icon: 'logout',
      danger: true,
    },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openSettings(): void {
    const modalConfig: ModalConfig = {
      size: 'lg',
      title: 'User Settings',
      type: 'success',
      centered: true,
      preventClose: false,
      fullscreen: false,
      showClose: true,
      backdrop: true,
      padding: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
      customClass: '',
    };
    this.openModal.emit(modalConfig);
  }

  /* OTHER */

  settingsSections = [
    {
      title: 'Account Settings',
      items: [
        {
          icon: 'person',
          title: 'Profile Information',
          description: 'Update your personal information',
          actionLabel: 'Edit',
          action: 'editProfile',
        },
        {
          icon: 'lock',
          title: 'Password & Security',
          description: 'Manage your password and security settings',
          actionLabel: 'Manage',
          action: 'security',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'palette',
          title: 'Appearance',
          description: 'Customize the look and feel',
          actionLabel: 'Customize',
          action: 'appearance',
        },
        {
          icon: 'notifications',
          title: 'Notifications',
          description: 'Configure your notification preferences',
          actionLabel: 'Configure',
          action: 'notifications',
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
        {
          icon: 'visibility',
          title: 'Privacy Settings',
          description: 'Manage your privacy preferences',
          actionLabel: 'Manage',
          action: 'privacy',
        },
        {
          icon: 'history',
          title: 'Activity Log',
          description: 'View your account activity',
          actionLabel: 'View',
          action: 'activity',
        },
      ],
    },
  ];
}
