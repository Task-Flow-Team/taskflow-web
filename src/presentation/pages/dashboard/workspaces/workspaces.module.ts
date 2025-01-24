import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceService } from '@/src/data/repositories/workspace/workspace.service';
import { WorkspacesComponent } from './workspaces.component';
import { WorkspaceCardComponent } from './components/workspaceCard/workspace-card.component';
import { WorkspaceListComponent } from './components/workspaceList/workspace-list.component';
import { ClickOutsideDirective } from '@/src/shared/directives/clickOutside.directive';
import { NgIconsModule } from '@ng-icons/core';
import { 
  heroPlus, 
  heroFolderOpen,
  heroUsers,
  heroEllipsisVertical,
  heroTrash 
} from '@ng-icons/heroicons/outline';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: WorkspacesComponent
  }
];

@NgModule({
  declarations: [
    WorkspacesComponent,
    WorkspaceCardComponent,
    WorkspaceListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ClickOutsideDirective,
    NgIconsModule.withIcons({ 
      heroPlus, 
      heroFolderOpen,
      heroUsers,
      heroEllipsisVertical,
      heroTrash
    })
  ],
  providers: [
    WorkspaceService,
    provideHttpClient()
  ]
})
export class WorkspacesModule { }