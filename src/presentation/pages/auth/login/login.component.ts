import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {LoginService} from "@/src/presentation/pages/auth/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // Define the router for navigation
  private router = inject(Router);
  // Define the login form group
  loginForm: FormGroup;
  // Define the loading state
  loading: boolean = false;
  // Define the show password state
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
  ) {

    // Define the login form group with email and password fields
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });

  }

  ngOnInit(): void {
    // Here you can add any necessary initialization
    // For example, check if there are saved credentials
    this.checkSavedCredentials();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password, rememberMe } = this.loginForm.value;

      // Llamamos a nuestro servicio de autenticación
      this.loginService.login(email, password).subscribe({
        next: (response) => {

          const { access_token } = response;

          // Si el usuario seleccionó "Recordarme", guardamos el email
          if (rememberMe) {
            this.saveCredentials(email);
          }

          localStorage.setItem('access_token', access_token);

          this.router.navigate(['/dashboard']);
          this.loading = false;
        },
        error: (error) => {
          // Manejo de error (credenciales inválidas, servidor caído, etc.)
          console.error('Error en login:', error);
          /*this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Credenciales incorrectas'
          });*/
          this.loading = false;
        },
      });
    } else {
      // Si el formulario es inválido, marcamos todos los campos como "touched"
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  // Method to check if there are saved credentials
  private checkSavedCredentials(): void {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      this.loginForm.patchValue({
        email: savedEmail,
        rememberMe: true,
      });
    }
  }

  // Method to save credentials if rememberMe is active
  private saveCredentials(email: string): void {
    localStorage.setItem('savedEmail', email);
  }

  // Helper methods to validate form fields
  isFieldValid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control) {
      if (control.hasError('required')) {
        return 'This field is required';
      }
      if (control.hasError('email')) {
        return 'Please, enter a valid email';
      }
      if (control.hasError('minlength')) {
        return 'The password must have at least 8 characters';
      }
      if (control.hasError('pattern')) {
        return 'Invalid email format';
      }
    }
    return '';
  }

  // Method to reset the form
  resetForm(): void {
    this.loginForm.reset();
    localStorage.removeItem('savedEmail');
  }

  // Method to navigate to the register page with a smooth transition
  async navigateToRegister() {

    // Check if the startViewTransition method is available
    if (!(document as any).startViewTransition) {
      await this.router.navigateByUrl('/auth/register');
      return;
    }

    // Add the slide-out class to the login container
    const container = document.querySelector('.login-container');
    container?.classList.add('slide-out');

    // Wait for 400 milliseconds before calling startViewTransition
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Call startViewTransition directly on the document
    (document as any).startViewTransition(() => this.router.navigateByUrl('/auth/register'));

    // Remove the slide-out class after 400 milliseconds
    setTimeout(() => {
      container?.classList.remove('slide-out');
    }, 400);
  }
}

