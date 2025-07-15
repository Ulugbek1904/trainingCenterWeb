import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TenantDto,
  TenantCreateDto,
  TenantUpdateDto
} from '../../../../core/models/tenant/tenant.model';
import { TenantApiService } from '../../../../core/services/tenant/tenant-api.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tenant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './tenant-form.component.html'
})
export class TenantFormComponent implements OnInit, OnChanges {
  @Input() tenant: TenantDto | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private tenantApi = inject(TenantApiService);

  form!: FormGroup;
  isSubmitting = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      logoUrl: [''],
      telegramBotToken: ['', Validators.required],
      contactPhoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      language: ['uz'],
      isActive: [true]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tenant'] && this.tenant && this.form) {
      this.form.patchValue({
        name: this.tenant.name,
        logoUrl: this.tenant.logoUrl,
        telegramBotToken: this.tenant.telegramBotToken,
        contactPhoneNumber: this.tenant.contactPhoneNumber,
        address: this.tenant.address,
        language: this.tenant.language,
        isActive: this.tenant.isActive
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    if (this.tenant) {
      const dto: TenantUpdateDto = this.form.value;
      this.tenantApi.update(this.tenant.id, dto).subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (err) => {
          console.error('Tahrirlashda xatolik:', err);
          this.isSubmitting = false;
        }
      });
    } else {
      const dto: TenantCreateDto = this.form.value;
      this.tenantApi.create(dto).subscribe({
        next: () => {
          this.saved.emit();
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
  }
}
