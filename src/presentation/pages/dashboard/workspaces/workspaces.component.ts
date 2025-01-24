import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '@/src/data/repositories/workspace/workspace.service';
import { Observable } from 'rxjs';
import { Workspace } from '@/src/core/domain/models/workspace.model';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
})
export class WorkspacesComponent implements OnInit {
  workspaces$: Observable<Workspace[]>;

  constructor(private workspaceService: WorkspaceService) {
    this.workspaces$ = this.workspaceService.getMyWorkspaces();
  }

  ngOnInit(): void {}

  createWorkspace(): void {
    // Implementar lógica para crear workspace
  }
}