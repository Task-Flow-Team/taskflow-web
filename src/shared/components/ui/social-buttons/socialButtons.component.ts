import { Component } from '@angular/core';

@Component({
  selector: 'social-buttons',
  standalone: true,
  template: `
    <div class="flex flex-row gap-4">
      <button
        type="button"
        class="w-full flex items-center justify-center gap-2 bg-slate-50 text-black shadow-sm hover:shadow-lg border-2 hover:bg-slate-100  font-semibold py-3 px-4 rounded-md transition ease-linear delay-250"
      >
        <img src="assets/images/github.svg" alt="github-icon" class="h-5 w-5">
        Continue with GitHub
      </button>
      <button
        type="button"
        class="w-full flex items-center justify-center gap-2 bg-slate-50 text-black shadow-sm hover:shadow-lg border-2 hover:bg-slate-100  font-semibold py-3 px-4 rounded-md transition ease-linear delay-250"
      >
        <img src="assets/images/google_multicolor.svg" alt="google-icon" class="h-5 w-5">
        Continue with Google
      </button>
    </div>
  `,
})
export class SocialButtonsComponent {}
