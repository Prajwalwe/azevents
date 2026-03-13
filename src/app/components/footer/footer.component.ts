import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Instagram, Facebook, Twitter, Mail } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly InstagramIcon = Instagram;
  readonly FacebookIcon = Facebook;
  readonly TwitterIcon = Twitter;
  readonly MailIcon = Mail;

  currentYear = new Date().getFullYear();
}
