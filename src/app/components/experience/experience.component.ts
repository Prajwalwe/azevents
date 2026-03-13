import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MessageCircle, Calendar, Sparkles, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  steps = [
    {
      title: 'Consultation',
      description: 'We begin with an in-depth conversation to understand your vision, traditions, and preferences.',
      icon: MessageCircle
    },
    {
      title: 'Besoke Planning',
      description: 'Our team crafts a detailed roadmap, from vendor selection to menu curation and decor design.',
      icon: Calendar
    },
    {
      title: 'Execution',
      description: 'On the day of the event, we handle all logistics, coordination, and setup with discreet professionalism.',
      icon: Sparkles
    },
    {
      title: 'Final Cleanup',
      description: 'We ensure a seamless transition post-event, leaving you with nothing but beautiful memories.',
      icon: CheckCircle
    }
  ];
}
