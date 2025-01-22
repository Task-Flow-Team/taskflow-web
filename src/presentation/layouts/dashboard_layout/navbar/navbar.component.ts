import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {UserService} from "@/src/presentation/services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() menuToggled = new EventEmitter<void>();
  @Output() modalOpened = new EventEmitter<any>();

  user = {
    name: 'Guest',
    avatar: 'assets/images/default_avatar.webp',
    email: 'user@example.com',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('NavbarComponent loaded'); // Verifica que este log aparece
    this.loadUserProfile();
  }

  toggleSidebar() {
    this.menuToggled.emit();
  }

  handleModalOpen(config: any) {
    this.modalOpened.emit(config);
  }

  private loadUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (profile) => {
        this.user.name = profile.name || profile.username;
        this.user.avatar = profile.profile_picture_url || 'assets/images/default_avatar.webp';
        this.user.email = profile.email;
        console.log('User profile loaded:', profile);
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      },
    });
  }
}
