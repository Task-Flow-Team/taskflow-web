// register.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private router = inject(Router);
  registerForm: FormGroup;
  currentStep = 1;
  totalSteps = 4;
  showPassword = false;
  loading = false;
  isTransitioning = false;
  selectedImage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      // Step 1
      fullName: ['', [Validators.required, Validators.minLength(3)]],

      // Step 2
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],

      // Step 3
      profilePicture: [null],
    });
  }

  async changeStep(newStep: number): Promise<void> {
    if (this.isTransitioning || newStep < 1 || newStep > this.totalSteps) {
      return;
    }

    this.isTransitioning = true;

    try {
      // Si no hay soporte para View Transitions
      if (!(document as any).startViewTransition) {
        this.currentStep = newStep;
        return;
      }

      console.log(`currentStep: ${this.currentStep}, newStep: ${newStep}`);

      // Crear una promesa que se resolverá cuando la transición termine
      return new Promise<void>(async (resolve) => {
        await (document as any).startViewTransition(async () => {
          const currentContent = document.querySelector('.step-content');
          
          if (currentContent) {
            currentContent.classList.add('fade-out');
            await new Promise((r) => setTimeout(r, 200));
          }

          this.currentStep = newStep;
          console.log(`after update currentStep: ${this.currentStep}`);

          await new Promise((r) => setTimeout(r, 50));

          const newContent = document.querySelector('.step-content');
          if (newContent) {
            newContent.classList.remove('fade-out');
          }
          console.log(`one seconds later currentStep: ${this.currentStep}`);
          
          // Resolvemos la promesa después de que todo esté completo
          resolve();
        });
      });

    } catch (error) {
      console.error('Error en la transición:', error);
      this.currentStep = newStep;
    } finally {
      this.isTransitioning = false;
    }
  }

  async nextStep(): Promise<void> {
    if (this.isCurrentStepValid() && this.currentStep < this.totalSteps) {
      try {
        await this.changeStep(this.currentStep + 1);
        // Este log ahora se ejecutará después de que changeStep haya terminado completamente
        console.log(`after nextStep currentStep: ${this.currentStep}`);
      } catch (error) {
        console.error('Error en nextStep:', error);
      }
    }
  }

  // También hacer asíncronos estos métodos
  async previousStep(): Promise<void> {
    if (this.currentStep > 1) {
      await this.changeStep(this.currentStep - 1);
    }
  }

  async skipStep(): Promise<void> {
    if (this.currentStep === 3 && this.currentStep < this.totalSteps) {
      await this.changeStep(this.currentStep + 1);
    }
  }
  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.registerForm.get('fullName')?.valid ?? false;
      case 2:
        return (
          (this.registerForm.get('email')?.valid &&
            this.registerForm.get('username')?.valid &&
            this.registerForm.get('password')?.valid) ??
          false
        );
      case 3:
        return true; // Siempre válido ya que se puede saltar
      default:
        return true;
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
        this.registerForm.patchValue({
          profilePicture: file,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      this.loading = true;
      try {
        // Aquí iría la lógica de registro
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulación
        this.currentStep++;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }

  async navigateToLogin() {
    // Verificar soporte para View Transitions
    if (!(document as any).startViewTransition) {
      await this.router.navigateByUrl('/auth/login');
      return;
    }

    // Aplicar la transición
    await (document as any).startViewTransition(async () => {
      // Agregar clase de salida
      const container = document.querySelector('.register-container');
      container?.classList.add('slide-out');

      // Esperar a que termine la animación
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Navegar
      await this.router.navigateByUrl('/auth/login');
    });
  }
}
