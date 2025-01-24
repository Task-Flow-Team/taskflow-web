// src/core/domain/models/workspace.model.ts
export interface Workspace {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    members: WorkspaceMember[];
    icon?: string;
    color?: string;
  }
  
  export interface WorkspaceMember {
    id: string;
    userId: string;
    workspaceId: string;
    role: WorkspaceRole;
    joinedAt: Date;
  }
  
  export enum WorkspaceRole {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
    GUEST = 'GUEST'
  }