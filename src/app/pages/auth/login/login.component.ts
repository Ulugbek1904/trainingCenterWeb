import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { AuthApiService } from '../../../core/services/auth-api.service';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { LoginDto } from '../../../core/models/auth.model';
import { AppConfigService } from '../../../core/services/app-config.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authApi = inject(AuthApiService);
  private authState = inject(AuthStateService);
  private router = inject(Router);
  private toast = inject(MessageService);
  public config = inject(AppConfigService);

  loginForm!: FormGroup;
  isLoading = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.isLoading = true;

    const dto: LoginDto = this.loginForm.value;

    this.authApi.login(dto).subscribe({
      next: (res) => {
        this.authState.setTokens(res.accessToken, res.refreshToken);
        this.toast.add({
          severity: 'success',
          summary: 'Xush kelibsiz!',
          detail: res.user.fullName,
        });
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.add({
          severity: 'error',
          summary: 'Xatolik',
          detail: err?.error?.message || 'Kirishda xatolik yuz berdi',
        });
      },
    });
  }
}
