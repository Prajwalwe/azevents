import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Flower, Utensils, Paintbrush, Heart } from 'lucide-angular';

@Component({
  selector: 'app-services',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      title: 'Sacred Ceremonies',
      description: 'Complete Pooja arrangements, priest coordination, and ritual-specific decor for a divine atmosphere.',
      image: 'assets/images/ceremony.png',
      icon: Flower
    },
    {
      title: 'Gourmet Catering',
      description: 'Exquisite multi-cuisine menus curated by expert chefs, tailored to your cultural and dietary preferences.',
      image: 'assets/images/catering.png',
      icon: Utensils
    },
    {
      title: 'Bespoke Decoration',
      description: 'Transforming venues with floral elegance, sophisticated lighting, and immersive theme-based setups.',
      image: 'assets/images/decoration.png',
      icon: Paintbrush
    },
    {
      title: 'Special Occasions',
      description: 'From grand weddings to intimate baby showers, we manage every detail with precision and grace.',
      imagePath: 'hero.png', // Fallback or another one
      icon: Heart
    }
  ];
}
