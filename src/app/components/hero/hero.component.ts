import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly ChevronRightIcon = ChevronRight;
}
