import { Component, EventEmitter, Input, OnInit, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserApiService } from '../../../../core/services/user/user-api.service';
import { TenantApiService } from '../../../../core/services/tenant/tenant-api.service';
import { UserCreateDto, UserDto, UserUpdateDto } from '../../../../core/models/user/user.model';
import { TenantDto } from '../../../../core/models/tenant/tenant.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    CheckboxModule,
  ],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user: UserDto | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private userApi = inject(UserApiService);
  private tenantApi = inject(TenantApiService);

  form!: FormGroup;
  tenants: TenantDto[] = [];
  isSubmitting = false;

  ngOnInit(): void {
    this.initializeForm();
    this.tenantApi.getAll().subscribe(data => this.tenants = data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.form) {
      this.initializeForm();
      if (this.user) {
        this.form.patchValue({ ...this.user });
      }
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      phoneNumber: [''],
      email: [''],
      address: [''],
      languagePreference: [''],
      password: [''],
      tenantId: ['', Validators.required],
      isActive: [true]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    if (this.user) {
      const dto: UserUpdateDto = {
        ...this.form.value,
        id: this.user.id,
        role: 1
      };
      this.userApi.update(this.user.id, dto).subscribe({
        next: () => {
          this.saved.emit();
          this.isSubmitting = false;
          this.form.reset();
          this.initializeForm();
        },
        error: (err) => {
          console.error('Tahrirlashda xatolik:', err);
          this.isSubmitting = false;
        }
      });
    } else {
      const dto: UserCreateDto = {
        ...this.form.value,
        role: 1
      };
      this.userApi.create(dto).subscribe({
        next: () => {
          this.saved.emit();
          this.isSubmitting = false;
          this.form.reset();
          this.initializeForm();
        },
        error: (err) => {
          console.error('Yaratishda xatolik:', err);
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
    this.form.reset();
    this.initializeForm();
    this.isSubmitting = false;
  }

  get isEditMode(): boolean {
    return !!this.user;
  }
}