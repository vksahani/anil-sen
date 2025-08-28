import { Component, OnInit, ChangeDetectionStrategy, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, Education } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, fadeInLeft, fadeInRight } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="education section" #educationSection>
      <div class="container">
        <div class="section-header" [@fadeInUp]>
          <h2 class="section-title">Education</h2>
          <p class="section-subtitle">My academic background and qualifications</p>
        </div>

        <div class="education-grid">
          <div 
            *ngFor="let edu of education(); let i = index; trackBy: trackByEducation" 
            class="education-card"
            [class.visible]="isVisible()"
            [@fadeInUp]="{ delay: i * 200 + 'ms' }">
            
            <div class="card-header">
              <div class="institution-logo">
                🎓
              </div>
              
              <div class="education-info">
                <h3 class="degree">{{ edu.degree }}</h3>
                <h4 class="field">{{ edu.field }}</h4>
                <h5 class="institution">{{ edu.institution }}</h5>
                
                <div class="education-meta">
                  <span class="duration">{{ edu.startYear }} - {{ edu.endYear }}</span>
                  <span class="grade" *ngIf="edu.grade">{{ edu.grade }}</span>
                </div>
              </div>
            </div>

            <div class="card-body" *ngIf="edu.coursework || edu.honors">
              <div class="coursework" *ngIf="edu.coursework && edu.coursework.length > 0">
                <h6>Relevant Coursework</h6>
                <div class="coursework-tags">
                  <span 
                    *ngFor="let course of edu.coursework" 
                    class="course-tag">
                    {{ course }}
                  </span>
                </div>
              </div>

              <div class="honors" *ngIf="edu.honors && edu.honors.length > 0">
                <h6>Honors & Achievements</h6>
                <ul class="honors-list">
                  <li *ngFor="let honor of edu.honors">{{ honor }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="education-summary" [@fadeInUp]>
          <div class="summary-content">
            <h3>Academic Excellence</h3>
            <p>
              My educational journey has provided me with a strong foundation in computer science 
              principles, software engineering practices, and modern development methodologies. 
              The combination of theoretical knowledge and practical application has shaped my 
              approach to problem-solving and technical innovation.
            </p>
            
            <div class="education-stats">
              <div class="stat-item">
                <div class="stat-icon">📚</div>
                <div class="stat-content">
                  <span class="stat-label">Degree</span>
                  <span class="stat-value">B.Tech CSE</span>
                </div>
              </div>
              
              <div class="stat-item">
                <div class="stat-icon">🏆</div>
                <div class="stat-content">
                  <span class="stat-label">CGPA</span>
                  <span class="stat-value">8.2/10</span>
                </div>
              </div>
              
              <div class="stat-item">
                <div class="stat-icon">📅</div>
                <div class="stat-content">
                  <span class="stat-label">Graduated</span>
                  <span class="stat-value">2019</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./education.component.scss'],
  animations: [fadeInUp, fadeInLeft, fadeInRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent implements OnInit, AfterViewInit {
  @ViewChild('educationSection') educationSection!: ElementRef;
  
  education = signal<Education[]>([]);
  isVisible = signal(false);

  constructor(
    private contentService: ContentService,
    private intersectionObserver: IntersectionObserverService
  ) {}

  ngOnInit(): void {
    this.contentService.education$.subscribe(education => {
      this.education.set(education);
    });
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(this.educationSection).subscribe(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          this.isVisible.set(true);
        }
      });
    });
  }

  trackByEducation(index: number, edu: Education): string {
    return edu.id;
  }
}