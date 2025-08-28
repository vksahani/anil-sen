import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../../core/services/content.service';
import { fadeInUp, scaleIn } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-resume-invite',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="resume-invite section">
      <div class="container">
        <div class="resume-card" [@fadeInUp]>
          <div class="resume-content">
            <div class="resume-icon" [@scaleIn]>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>

            <div class="resume-text">
              <h2>Download My Resume</h2>
              <p>
                Get a comprehensive overview of my professional experience, skills, and achievements. 
                My resume includes detailed information about my projects, technical expertise, and career progression.
              </p>

              <div class="resume-highlights">
                <div class="highlight-item">
                  <span class="highlight-icon">📄</span>
                  <span>Comprehensive work history</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-icon">🛠️</span>
                  <span>Technical skills breakdown</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-icon">🏆</span>
                  <span>Key achievements & metrics</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-icon">📞</span>
                  <span>Contact information</span>
                </div>
              </div>
            </div>
          </div>

          <div class="resume-actions">
            <a 
              [href]="personalInfo()?.resumeUrl" 
              download
              class="btn btn-primary download-btn"
              [attr.aria-label]="'Download ' + personalInfo()?.name + ' resume'">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-15"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download Resume</span>
            </a>

            <a 
              [href]="personalInfo()?.resumeUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-secondary view-btn"
              [attr.aria-label]="'View ' + personalInfo()?.name + ' resume in new tab'">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              <span>View Online</span>
            </a>

            <button 
              class="btn btn-accent email-btn"
              (click)="requestResumeByEmail()"
              [attr.aria-label]="'Request ' + personalInfo()?.name + ' resume by email'"
              type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>Email Resume</span>
            </button>
          </div>

          <div class="resume-stats">
            <div class="stat-item">
              <div class="stat-number">{{ personalInfo()?.yearsOfExperience }}+</div>
              <div class="stat-label">Years Experience</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">Projects Completed</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-number">10+</div>
              <div class="stat-label">Technologies</div>
            </div>
          </div>
        </div>

        <div class="resume-testimonial" [@fadeInUp]>
          <blockquote>
            "{{ personalInfo()?.name }} is a highly skilled developer with exceptional problem-solving abilities 
            and a keen eye for detail. His technical expertise and collaborative approach make him 
            an invaluable team member."
          </blockquote>
          <cite>— Previous Colleague</cite>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./resume-invite.component.scss'],
  animations: [fadeInUp, scaleIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeInviteComponent implements OnInit {
  personalInfo = signal<any>(null);

  constructor(private contentService: ContentService) {
    this.personalInfo.set(this.contentService.personalInfo);
  }

  ngOnInit(): void {
    this.contentService.personalInfo$.subscribe(info => {
      this.personalInfo.set(info);
    });
  }

  requestResumeByEmail(): void {
    const subject = encodeURIComponent(`Resume Request - ${this.personalInfo()?.name}`);
    const body = encodeURIComponent(
      `Hi ${this.personalInfo()?.name},\n\n` +
      `I would like to request a copy of your resume. Please send it to this email address.\n\n` +
      `Thank you!\n\n` +
      `Best regards`
    );
    
    const mailtoLink = `mailto:${this.personalInfo()?.email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  }
}