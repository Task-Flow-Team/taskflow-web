import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';

export interface ModalConfig {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  type: 'default' | 'success' | 'warning' | 'error' | 'info';
  title?: string;
  showClose: boolean;
  backdrop: boolean;
  centered: boolean;
  padding: boolean;
  fullscreen: boolean;
  closeOnClickOutside: boolean;
  closeOnEsc: boolean;
  preventClose: boolean;
  customClass: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="modal-wrapper">
      <!-- Backdrop -->
      <div
        class="modal-backdrop fixed inset-0 bg-black bg-opacity-50"
        (click)="onBackdropClick()"
        [@backdropAnimation]
      ></div>

      <!-- Modal -->
      <div
        class="modal-container fixed inset-0 z-50 overflow-y-auto"
        [class.flex]="config.centered"
        [class.items-center]="config.centered"
        [class.justify-center]="config.centered"
        [@modalAnimation]
      >
        <div
          class="modal-content relative mx-auto bg-white rounded-xl shadow-xl"
          [class.p-6]="config.padding !== false"
          [ngClass]="[
            sizeClass,
            config.customClass || '',
            config.fullscreen ? 'fixed inset-0 rounded-none' : ''
          ]"
        >
          <!-- Header -->
          <div
            *ngIf="config.title || config.showClose !== false"
            class="flex items-center justify-between mb-4"
          >
            <span *ngIf="config.title" class="text-lg">
              raro
            </span>
            <button
              *ngIf="config.showClose !== false"
              (click)="close()"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <!-- Content -->
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-wrapper {
        position: fixed;
        inset: 0;
        z-index: 1000;
      }

      .modal-backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: -1;
        backdrop-filter: blur(4px);
      }

      .modal-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 1rem;
      }

      .modal-content {
        width: 100%;
        margin: auto;
        background: white;
        border-radius: 0.75rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        will-change: transform, opacity;
      }

      // Clases de tamaño
      .modal-sm {
        max-width: 24rem;
      }
      .modal-md {
        max-width: 32rem;
      }
      .modal-lg {
        max-width: 48rem;
      }
      .modal-xl {
        max-width: 64rem;
      }
      .modal-full {
        max-width: none;
      }
    `,
  ],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95) translateY(-20px)',
        }),
        animate(
          '300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            opacity: 1,
            transform: 'scale(1) translateY(0)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            opacity: 0,
            transform: 'scale(0.95) translateY(20px)',
          })
        ),
      ]),
    ]),
    trigger('backdropAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() config: ModalConfig = {
    size: 'md',
    type: 'default',
    showClose: true,
    backdrop: true,
    centered: true,
    padding: true,
    closeOnClickOutside: true,
    closeOnEsc: true,
    preventClose: false,
    fullscreen: false,
    customClass: '',
  };
  @Input() content?: TemplateRef<any>;
  @Input() footer?: TemplateRef<any>;

  @Output() closed = new EventEmitter<void>();

  get sizeClass(): string {
    switch (this.config.size) {
      case 'sm':
        return 'modal-sm';
      case 'lg':
        return 'modal-lg';
      case 'xl':
        return 'modal-xl';
      case 'full':
        return 'modal-full';
      default:
        return 'modal-md';
    }
  }

  get typeClass(): string {
    switch (this.config.type) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      case 'info':
        return 'text-blue-600';
      default:
        return '';
    }
  }

  constructor() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen && this.config.closeOnEsc) {
        this.close();
      }
    });
  }

  onBackdropClick(): void {
    if (this.config.closeOnClickOutside && !this.config.preventClose) {
      this.close();
    }
  }

  close(): void {
    if (!this.config.preventClose) {
      this.isOpen = false;
      this.closed.emit();
    }
  }
}
