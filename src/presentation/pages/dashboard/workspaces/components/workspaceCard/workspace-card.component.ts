import { Component, Input } from '@angular/core';
import { Workspace } from '@/src/core/domain/models/workspace.model';
import { Router } from '@angular/router';
import { WorkspaceService } from '@/src/data/repositories/workspace/workspace.service';

@Component({
  selector: 'app-workspace-card',
  templateUrl: './workspace-card.component.html',
  styleUrls: ['./workspace-card.component.scss']
})
export class WorkspaceCardComponent {
  @Input() workspace!: Workspace;
  isMenuOpen = false;
  
  constructor(
    private router: Router,
    private workspaceService: WorkspaceService
  ) {}

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToWorkspace(): void {
    this.router.navigate(['/dashboard/workspaces', this.workspace.id]);
  }

  editWorkspace(event: Event): void {
    event.stopPropagation();
    // Implementar lógica de edición
  }

  deleteWorkspace(event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this workspace?')) {
      this.workspaceService.deleteWorkspace(this.workspace.id).subscribe();
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}