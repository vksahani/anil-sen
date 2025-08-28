import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  personalInfo = signal<any>(null);
  newsletterEmail = signal('');
  showBackToTop = signal(false);
  currentYear = new Date().getFullYear();
  angularVersion = '20';

  constructor(private contentService: ContentService) {
    this.personalInfo.set(this.contentService.personalInfo);
    // Listen for scroll events to show/hide back to top button
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.showBackToTop.set(window.scrollY > 500);
      });
    }
  }

  ngOnInit(): void {
    this.contentService.personalInfo$.subscribe(info => {
      this.personalInfo.set(info);
    });
  }

  updateNewsletterEmail(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newsletterEmail.set(target.value);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  subscribeNewsletter(): void {
    const email = this.newsletterEmail();
    if (this.isValidEmail(email)) {
      // In a real application, you would send this to your newsletter service
      console.log('Newsletter subscription:', email);
      
      // Show success feedback
      alert('Thank you for subscribing! You\'ll receive updates about my latest projects.');
      this.newsletterEmail.set('');
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}