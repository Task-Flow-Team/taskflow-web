import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { Workspace, WorkspaceMember } from '@/src/core/domain/models/workspace.model';
import { environment } from '@/src/enviroments/enviroment';

interface CreateWorkspaceDto {
  name: string;
  description?: string;
}

interface WorkspaceResponse {
  message: string;
  workspace: Workspace;
}

interface CollaboratorResponse {
  message: string;
  collaborator: WorkspaceMember;
}

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private apiUrl = `${environment.apiUrl}/v1/workspaces`;
  private workspacesSubject = new BehaviorSubject<Workspace[]>([]);
  public workspaces$ = this.workspacesSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Obtener todos los workspaces (solo admin)
  getAllWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Obtener workspaces del usuario actual (como propietario o colaborador)
  getMyWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${this.apiUrl}/my-workspaces`, { headers: this.getHeaders() })
      .pipe(
        tap(workspaces => this.workspacesSubject.next(workspaces))
      );
  }

  // Obtener workspaces donde el usuario es colaborador
  getWorkspacesCollaboratedBy(userId: string): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(
      `${this.apiUrl}/collaborated-by/${userId}`,
      { headers: this.getHeaders() }
    );
  }

  // Obtener workspaces creados por un usuario
  getWorkspacesCreatedBy(userId: string): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(
      `${this.apiUrl}/created-by/${userId}`,
      { headers: this.getHeaders() }
    );
  }

  // Obtener un workspace por ID
  getWorkspaceById(id: string): Observable<Workspace> {
    return this.http.get<Workspace>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // Crear un nuevo workspace
  createWorkspace(workspace: CreateWorkspaceDto): Observable<Workspace> {
    return this.http.post<WorkspaceResponse>(
      this.apiUrl,
      workspace,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.workspace),
      tap(newWorkspace => {
        const currentWorkspaces = this.workspacesSubject.value;
        this.workspacesSubject.next([...currentWorkspaces, newWorkspace]);
      })
    );
  }

  // Actualizar un workspace
  updateWorkspace(id: string, workspace: Partial<Workspace>): Observable<Workspace> {
    return this.http.put<WorkspaceResponse>(
      `${this.apiUrl}/${id}`,
      workspace,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.workspace),
      tap(updatedWorkspace => {
        const currentWorkspaces = this.workspacesSubject.value;
        const index = currentWorkspaces.findIndex(w => w.id === id);
        if (index !== -1) {
          currentWorkspaces[index] = updatedWorkspace;
          this.workspacesSubject.next([...currentWorkspaces]);
        }
      })
    );
  }

  // Eliminar un workspace
  deleteWorkspace(id: string): Observable<void> {
    return this.http.delete<{message: string}>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(() => void 0),
      tap(() => {
        const currentWorkspaces = this.workspacesSubject.value;
        this.workspacesSubject.next(
          currentWorkspaces.filter(workspace => workspace.id !== id)
        );
      })
    );
  }

  // Gestión de colaboradores
  getCollaborators(workspaceId: string): Observable<WorkspaceMember[]> {
    return this.http.get<WorkspaceMember[]>(
      `${this.apiUrl}/${workspaceId}/collaborators`,
      { headers: this.getHeaders() }
    );
  }

  addCollaborator(workspaceId: string, userId: string): Observable<WorkspaceMember> {
    return this.http.post<CollaboratorResponse>(
      `${this.apiUrl}/${workspaceId}/collaborators`,
      { userId },
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.collaborator)
    );
  }

  removeCollaborator(workspaceId: string, userId: string): Observable<void> {
    return this.http.delete<{message: string}>(
      `${this.apiUrl}/${workspaceId}/collaborators/${userId}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(() => void 0)
    );
  }
}