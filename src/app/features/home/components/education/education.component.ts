import { Component, OnInit, ChangeDetectionStrategy, signal, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
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
          @for (edu of education(); track edu.id; let i = $index) {
            <div 
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
                    @if (edu.grade) {
                      <span class="grade">{{ edu.grade }}</span>
                    }
                  </div>
                </div>
              </div>

              @if (edu.coursework || edu.honors) {
                <div class="card-body">
                  @if (edu.coursework && edu.coursework.length > 0) {
                    <div class="coursework">
                      <h6>Relevant Coursework</h6>
                      <div class="coursework-tags">
                        @for (course of edu.coursework; track course) {
                          <span class="course-tag">{{ course }}</span>
                        }
                      </div>
                    </div>
                  }

                  @if (edu.honors && edu.honors.length > 0) {
                    <div class="honors">
                      <h6>Honors & Achievements</h6>
                      <ul class="honors-list">
                        @for (honor of edu.honors; track honor) {
                          <li>{{ honor }}</li>
                        }
                      </ul>
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>

        <div class="education-summary" [@fadeInUp]>
          <div class="summary-content">
            <h3>Academic Excellence</h3>
            <p>
              My educational journey has provided me with a strong foundation in engineering 
              principles, analytical thinking, and problem-solving methodologies. 
              The combination of theoretical knowledge and practical application has shaped my 
              approach to software development and technical innovation.
            </p>
            
            <div class="education-stats">
              @if (education()[0]) {
                <div class="stat-item">
                  <div class="stat-icon">📚</div>
                  <div class="stat-content">
                    <span class="stat-label">Degree</span>
                    <span class="stat-value">{{ education()[0].degree }}</span>
                  </div>
                </div>
              }
              
              @if (education()[0]) {
                <div class="stat-item">
                  <div class="stat-icon">🏆</div>
                  <div class="stat-content">
                    <span class="stat-label">Grade</span>
                    <span class="stat-value">{{ education()[0].grade }}</span>
                  </div>
                </div>
              }
              
              @if (education()[0]) {
                <div class="stat-item">
                  <div class="stat-icon">📅</div>
                  <div class="stat-content">
                    <span class="stat-label">Graduated</span>
                    <span class="stat-value">{{ education()[0].endYear }}</span>
                  </div>
                </div>
              }
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

  private contentService = inject(ContentService);
  private intersectionObserver = inject(IntersectionObserverService);

  constructor() {}

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


}