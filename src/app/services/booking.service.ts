import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

export interface BookingInquiry {
  fullName: string;
  email: string;
  eventType: string;
  eventDate: string;
  vision: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = '/api/send-email';

  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) { }

  sendInquiry(data: BookingInquiry): Observable<any> {
    this.loading.set(true);
    this.success.set(false);
    this.error.set(null);

    return this.http.post(this.apiUrl, data).pipe(
      tap(() => {
        this.loading.set(false);
        this.success.set(true);
      }),
      catchError((err) => {
        this.loading.set(false);
        this.error.set(err.message || 'An error occurred while sending your inquiry.');
        throw err;
      })
    );
  }

  resetState() {
    this.success.set(false);
    this.error.set(null);
  }
}
