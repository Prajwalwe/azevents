import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, Send } from 'lucide-angular';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  private fb = inject(FormBuilder);
  bookingService = inject(BookingService);

  readonly SendIcon = Send;
  bookingForm: FormGroup;

  constructor() {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      eventType: ['', Validators.required],
      eventDate: ['', Validators.required],
      vision: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.bookingService.sendInquiry(this.bookingForm.value).subscribe({
        next: () => {
          this.bookingForm.reset();
          setTimeout(() => this.bookingService.resetState(), 5000);
        },
        error: (err) => {
          console.error('Inquiry error:', err);
        }
      });
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}
