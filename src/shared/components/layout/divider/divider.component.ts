import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'divider',
  imports: [NgIf],
  standalone: true,
  template: `
    <div class="relative flex items-center my-4">
      <div class="flex-grow border-t border-gray-300"></div>
      <span *ngIf="text.length > 0" class="flex-shrink mx-4 text-gray-600">{{text}}</span>
      <div *ngIf="text.length > 0" class="flex-grow border-t border-gray-300"></div>
    </div>
  `,
})
export class DividerComponent {
    constructor() {
        this.text = "";
    }

    @Input() text: string;
}
