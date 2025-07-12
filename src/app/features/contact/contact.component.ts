import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-contact',
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule, CommonModule, ToastModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s]+$/)]],
      message: ['', Validators.required]
    })
  }

  onSubmit() {
  if (this.contactForm.valid) {
    const { name, email, message } = this.contactForm.value;

    this.messageService.add({
      severity: 'success',
      summary: 'Xabar yuborildi',
      detail: 'Tez orada siz bilan bog‘lanamiz',
      life: 4000
    });

    this.contactForm.reset();
  }
}
}
