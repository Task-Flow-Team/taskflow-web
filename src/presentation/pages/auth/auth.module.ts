import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthLayoutComponent } from "../../layouts/auth_layout/auth_layout.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SocialButtonsComponent } from '@/src/shared/components/ui';
import { DividerComponent } from "@/src/shared/components/layout/";
import { RememberCheckboxComponent } from "@/src/shared/components/form";


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SocialButtonsComponent,
    DividerComponent,
    RememberCheckboxComponent
  ],
  exports: [],
})
export class AuthModule { }
