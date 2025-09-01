import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, fadeInLeft, fadeInRight } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="contact section" #contactSection>
      <div class="container">
        <div class="section-header" [@fadeInUp]>
          <h2 class="section-title">Get In Touch</h2>
          <p class="section-subtitle">Ready to start your next project? Let's work together to bring your ideas to life</p>
        </div>

        <div class="card-brooklyn">
          <div class="card-content">
            <div class="contact-content">
              <div class="contact-info" [@fadeInUp]>
            <div class="contact-intro">
              <h3>Let's Connect</h3>
              <p>
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you have a question, want to discuss a potential collaboration, or just 
                want to say hello, I'd love to hear from you.
              </p>
            </div>

            <div class="contact-methods">
              <a 
                [href]="'mailto:' + personalInfo()?.email" 
                class="contact-method card-glass-premium"
                [attr.aria-label]="'Send email to ' + personalInfo()?.email">
                <div class="method-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="method-content">
                  <span class="method-label">Email</span>
                  <span class="method-value">{{ personalInfo()?.email }}</span>
                </div>
                <button 
                  class="copy-btn" 
                  (click)="copyToClipboard(personalInfo()?.email || '', $event)"
                  [attr.aria-label]="'Copy email address'"
                  type="button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
              </a>

              <a 
                [href]="'tel:' + personalInfo()?.phone" 
                class="contact-method card-glass-premium"
                [attr.aria-label]="'Call ' + personalInfo()?.phone">
                <div class="method-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div class="method-content">
                  <span class="method-label">Phone</span>
                  <span class="method-value">{{ personalInfo()?.phone }}</span>
                </div>
                <button 
                  class="copy-btn" 
                  (click)="copyToClipboard(personalInfo()?.phone || '', $event)"
                  [attr.aria-label]="'Copy phone number'"
                  type="button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
              </a>

              <a 
                [href]="personalInfo()?.linkedin" 
                target="_blank" 
                rel="noopener noreferrer"
                class="contact-method card-glass-premium"
                [attr.aria-label]="'Visit LinkedIn profile'">
                <div class="method-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <div class="method-content">
                  <span class="method-label">LinkedIn</span>
                  <span class="method-value">Connect with me</span>
                </div>
                <div class="external-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
              </a>

              <a 
                [href]="personalInfo()?.github" 
                target="_blank" 
                rel="noopener noreferrer"
                class="contact-method card-glass-premium"
                [attr.aria-label]="'Visit GitHub profile'">
                <div class="method-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </div>
                <div class="method-content">
                  <span class="method-label">GitHub</span>
                  <span class="method-value">View my code</span>
                </div>
                <div class="external-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
              </a>
            </div>

            <div class="response-time">
              <div class="response-badge">
                <span class="response-icon">⚡</span>
                <span class="response-text">Usually responds within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./contact.component.scss'],
  animations: [fadeInUp, fadeInLeft, fadeInRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, AfterViewInit {
  @ViewChild('contactSection') contactSection!: ElementRef;
  
  personalInfo = signal<any>(null);

  private contentService = inject(ContentService);
  private intersectionObserver = inject(IntersectionObserverService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.personalInfo.set(this.contentService.personalInfo);
  }

  ngOnInit(): void {
    this.contentService.personalInfo$.subscribe(info => {
      if (info) {
        this.personalInfo.set(info);
        this.cdr.markForCheck(); // Trigger change detection
      }
    });
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(this.contactSection).subscribe(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          // Trigger any scroll-based animations here
        }
      });
    });
  }



  async copyToClipboard(text: string, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(text);
      
      // Show temporary feedback
      const button = event.target as HTMLElement;
      const originalContent = button.innerHTML;
      button.innerHTML = '✓';
      button.style.color = '#10b981';
      
      setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.color = '';
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }
}