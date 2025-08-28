import { Component, OnInit, ChangeDetectionStrategy, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, fadeInLeft, fadeInRight } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contact section" #contactSection>
      <div class="container">
        <div class="section-header" [@fadeInUp]>
          <h2 class="section-title">Get In Touch</h2>
          <p class="section-subtitle">Ready to start your next project? Let's work together to bring your ideas to life</p>
        </div>

        <div class="contact-content">
          <div class="contact-info" [@fadeInLeft]>
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
                class="contact-method"
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
                class="contact-method"
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
                class="contact-method"
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
                class="contact-method"
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

          <div class="contact-form-container" [@fadeInRight]>
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form" novalidate>
              <div class="form-header">
                <h3>Send a Message</h3>
                <p>Fill out the form below and I'll get back to you as soon as possible.</p>
              </div>

              <!-- Honeypot field for spam protection -->
              <input type="text" name="website" style="display: none;" tabindex="-1" autocomplete="off">

              <div class="form-row">
                <div class="form-group">
                  <label for="name" class="form-label">Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    formControlName="name"
                    class="form-input"
                    [class.error]="isFieldInvalid('name')"
                    placeholder="Your full name"
                    autocomplete="name">
                  <div class="error-message" *ngIf="isFieldInvalid('name')">
                    Name is required
                  </div>
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    formControlName="email"
                    class="form-input"
                    [class.error]="isFieldInvalid('email')"
                    placeholder="your.email@example.com"
                    autocomplete="email">
                  <div class="error-message" *ngIf="isFieldInvalid('email')">
                    <span *ngIf="contactForm.get('email')?.errors?.['required']">Email is required</span>
                    <span *ngIf="contactForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="phone" class="form-label">Phone (Optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  formControlName="phone"
                  class="form-input"
                  placeholder="+1 (555) 123-4567"
                  autocomplete="tel">
              </div>

              <div class="form-group">
                <label for="subject" class="form-label">Subject *</label>
                <select 
                  id="subject" 
                  formControlName="subject"
                  class="form-input form-select"
                  [class.error]="isFieldInvalid('subject')">
                  <option value="">Select a subject</option>
                  <option value="project">New Project Inquiry</option>
                  <option value="collaboration">Collaboration Opportunity</option>
                  <option value="job">Job Opportunity</option>
                  <option value="consultation">Consultation Request</option>
                  <option value="other">Other</option>
                </select>
                <div class="error-message" *ngIf="isFieldInvalid('subject')">
                  Please select a subject
                </div>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">Message *</label>
                <textarea 
                  id="message" 
                  formControlName="message"
                  class="form-input form-textarea"
                  [class.error]="isFieldInvalid('message')"
                  placeholder="Tell me about your project, requirements, or any questions you have..."
                  rows="6"></textarea>
                <div class="error-message" *ngIf="isFieldInvalid('message')">
                  <span *ngIf="contactForm.get('message')?.errors?.['required']">Message is required</span>
                  <span *ngIf="contactForm.get('message')?.errors?.['minlength']">Message must be at least 10 characters</span>
                </div>
              </div>

              <div class="form-actions">
                <button 
                  type="submit" 
                  class="btn btn-primary submit-btn"
                  [disabled]="contactForm.invalid || isSubmitting()"
                  [attr.aria-label]="'Send message'">
                  <span *ngIf="!isSubmitting()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                    </svg>
                    Send Message
                  </span>
                  <span *ngIf="isSubmitting()">
                    <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                    Sending...
                  </span>
                </button>

                <button 
                  type="button" 
                  class="btn btn-secondary reset-btn"
                  (click)="resetForm()"
                  [attr.aria-label]="'Reset form'">
                  Reset Form
                </button>
              </div>

              <div class="form-footer">
                <p class="privacy-note">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                  </svg>
                  Your information is secure and will never be shared with third parties.
                </p>
              </div>
            </form>

            <div class="success-message" [class.visible]="showSuccessMessage()" [@fadeInUp]>
              <div class="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <h4>Message Sent Successfully!</h4>
              <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
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
  contactForm: FormGroup;
  isSubmitting = signal(false);
  showSuccessMessage = signal(false);

  constructor(
    private contentService: ContentService,
    private intersectionObserver: IntersectionObserverService,
    private fb: FormBuilder
  ) {
    this.personalInfo.set(this.contentService.personalInfo);
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.contentService.personalInfo$.subscribe(info => {
      this.personalInfo.set(info);
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

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      
      try {
        // Simulate form submission - replace with actual API call
        await this.submitForm(this.contactForm.value);
        
        this.showSuccessMessage.set(true);
        this.contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage.set(false);
        }, 5000);
        
      } catch (error) {
        console.error('Form submission error:', error);
        // Handle error - show error message to user
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  private async submitForm(formData: any): Promise<void> {
    // This is a mock implementation
    // In a real application, you would send this to your backend API
    // or use a service like Netlify Forms, Formspree, or Firebase Functions
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', formData);
        resolve();
      }, 2000);
    });
  }

  resetForm(): void {
    this.contactForm.reset();
    this.showSuccessMessage.set(false);
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