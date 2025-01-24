import { Component, Input } from '@angular/core';
import { Workspace } from '@/src/core/domain/models/workspace.model';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss']
})
export class WorkspaceListComponent {
  @Input() workspaces: Workspace[] | null = [];
}