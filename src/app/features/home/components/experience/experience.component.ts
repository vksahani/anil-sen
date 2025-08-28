import { Component, OnInit, ChangeDetectionStrategy, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, Experience } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, fadeInLeft, fadeInRight } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="experience section" #experienceSection>
      <div class="container">
        <div class="section-header" [@fadeInUp]>
          <h2 class="section-title">Work Experience</h2>
          <p class="section-subtitle">My professional journey and key achievements</p>
        </div>

        <div class="timeline">
          <div 
            *ngFor="let exp of experience(); let i = index; trackBy: trackByExperience" 
            class="timeline-item"
            [class.visible]="isVisible()"
            [class.left]="i % 2 === 0"
            [class.right]="i % 2 === 1">
            
            <div class="timeline-marker">
              <div class="marker-dot"></div>
              <div class="marker-line" *ngIf="i < experience().length - 1"></div>
            </div>

            <div class="timeline-content">
              <div class="experience-card" (click)="toggleExpanded(exp.id)">
                <div class="card-header">
                  <div class="company-info">
                    <h3 class="position">{{ exp.position }}</h3>
                    <h4 class="company">{{ exp.company }}</h4>
                    <div class="duration">
                      <span class="date">{{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : 'Present' }}</span>
                      <span class="location">{{ exp.location }}</span>
                    </div>
                  </div>
                  
                  <div class="expand-icon" [class.expanded]="isExpanded(exp.id)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </div>

                <div class="card-body">
                  <p class="description">{{ exp.description }}</p>
                  
                  <div class="tech-stack">
                    <span 
                      *ngFor="let tech of exp.technologies" 
                      class="tech-tag">
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <div class="card-details" [class.expanded]="isExpanded(exp.id)">
                  <div class="responsibilities" *ngIf="exp.responsibilities.length > 0">
                    <h5>Key Responsibilities</h5>
                    <ul>
                      <li *ngFor="let responsibility of exp.responsibilities">
                        {{ responsibility }}
                      </li>
                    </ul>
                  </div>

                  <div class="achievements" *ngIf="exp.achievements.length > 0">
                    <h5>Key Achievements</h5>
                    <ul>
                      <li *ngFor="let achievement of exp.achievements">
                        {{ achievement }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="experience-summary" [@fadeInUp]>
          <div class="summary-stats">
            <div class="stat-item">
              <div class="stat-number">{{ getTotalExperience() }}</div>
              <div class="stat-label">Years Experience</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-number">{{ experience().length }}</div>
              <div class="stat-label">Companies</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-number">{{ getTotalProjects() }}</div>
              <div class="stat-label">Projects Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./experience.component.scss'],
  animations: [fadeInUp, fadeInLeft, fadeInRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  @ViewChild('experienceSection') experienceSection!: ElementRef;
  
  experience = signal<Experience[]>([]);
  isVisible = signal(false);
  expandedItems = signal<Set<string>>(new Set());

  constructor(
    private contentService: ContentService,
    private intersectionObserver: IntersectionObserverService
  ) {}

  ngOnInit(): void {
    this.contentService.experience$.subscribe(experience => {
      this.experience.set(experience);
    });
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(this.experienceSection).subscribe(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          this.isVisible.set(true);
        }
      });
    });
  }

  trackByExperience(index: number, exp: Experience): string {
    return exp.id;
  }

  toggleExpanded(id: string): void {
    const expanded = new Set(this.expandedItems());
    if (expanded.has(id)) {
      expanded.delete(id);
    } else {
      expanded.add(id);
    }
    this.expandedItems.set(expanded);
  }

  isExpanded(id: string): boolean {
    return this.expandedItems().has(id);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }

  getTotalExperience(): number {
    const experiences = this.experience();
    if (experiences.length === 0) return 0;

    const totalMonths = experiences.reduce((total, exp) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                    (endDate.getMonth() - startDate.getMonth());
      return total + months;
    }, 0);

    return Math.round(totalMonths / 12 * 10) / 10; // Round to 1 decimal place
  }

  getTotalProjects(): number {
    // Estimate based on experience - could be made configurable
    return this.experience().reduce((total, exp) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
      const years = (endDate.getFullYear() - startDate.getFullYear()) + 
                   (endDate.getMonth() - startDate.getMonth()) / 12;
      return total + Math.round(years * 3); // Estimate 3 projects per year
    }, 0);
  }
}