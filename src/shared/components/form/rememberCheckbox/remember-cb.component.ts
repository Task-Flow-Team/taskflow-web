import { Component } from '@angular/core';

@Component({
  selector: 'rememberCheckbox',
  standalone: true,
  template: `
    <label class="flex items-center cursor-pointer">
      <input type="checkbox" formControlName="rememberMe" class="hidden peer" />
      <div
        class="w-5 h-5 bg-gray-200 rounded-md border-2 border-gray-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 ease-in-out flex items-center justify-center"
      >
        <svg
          class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M20.707 5.293a1 1 0 00-1.414 0L10 14.586 6.707 11.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l10-10a1 1 0 000-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <span class="ml-3 text-md text-gray-700">Recordarme</span>
    </label>
  `,
})
export class RememberCheckboxComponent {}
