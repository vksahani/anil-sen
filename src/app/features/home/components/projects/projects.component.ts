import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, Project } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, staggerAnimation, scaleIn } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="projects section" #projectsSection>
      <div class="container">
        <div class="section-header" [@fadeInUp]>
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-subtitle">A showcase of my recent work and technical achievements</p>
        </div>

        <div class="projects-filter" [@fadeInUp]>
          @for (category of categories; track category.key) {
            <button 
              class="filter-btn"
              [class.active]="activeCategory() === category.key"
              (click)="setActiveCategory(category.key)"
              [attr.aria-label]="'Filter by ' + category.label + ' projects'"
              type="button">
              {{ category.label }}
            </button>
          }
        </div>

        <div class="projects-grid" [@stagger]>
          @for (project of filteredProjects(); track project.id) {
            <div 
              class="project-card"
              [class.visible]="isVisible()"
              (click)="openProjectModal(project)">
              
              <div class="project-image">
                <img 
                  [src]="project.imageUrl" 
                  [alt]="project.title + ' - Project Screenshot'"
                  class="project-img"
                  loading="lazy">
                
                <div class="project-overlay">
                  <div class="project-actions">
                    @if (project.adminUrl) {
                      <a 
                        [href]="project.adminUrl" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="action-btn demo-btn"
                        (click)="$event.stopPropagation()"
                        [attr.aria-label]="'View ' + project.title + ' live demo'">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        <span>Admin App</span>
                      </a>
                    }
                    
                    @if (project.userUrl) {
                      <a 
                        [href]="project.userUrl" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="action-btn github-btn"
                        (click)="$event.stopPropagation()"
                        [attr.aria-label]="'View ' + project.title + ' source code'">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                        <span>User App</span>
                      </a>
                    }

                     @if (project.playStoreUrl) {
                      <a 
                        [href]="project.playStoreUrl" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="action-btn github-btn"
                        (click)="$event.stopPropagation()"
                        [attr.aria-label]="'View ' + project.title + ' source code'">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                        <span>Play Store</span>
                      </a>
                    }

                     @if (project.appStoreUrl) {
                      <a 
                        [href]="project.appStoreUrl" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="action-btn github-btn"
                        (click)="$event.stopPropagation()"
                        [attr.aria-label]="'View ' + project.title + ' source code'">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                        <span>App Store</span>
                      </a>
                    }
                  </div>
                  
                  <div class="project-status">
                    <span class="status-badge" [attr.data-status]="project.status">
                      {{ getStatusLabel(project.status) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="project-content">
                <div class="project-header">
                  <h3 class="project-title">{{ project.title }}</h3>
                  <span class="project-category" [attr.data-category]="project.category">
                    {{ getCategoryLabel(project.category) }}
                  </span>
                </div>

                <p class="project-description">{{ project.description }}</p>

                <div class="project-tech">
                  @for (tech of project.technologies.slice(0, 4); track tech) {
                    <span class="tech-tag">{{ tech }}</span>
                  }
                  @if (project.technologies.length > 4) {
                    <span class="tech-more">
                      +{{ project.technologies.length - 4 }} more
                    </span>
                  }
                </div>

                <div class="project-highlights">
                  @for (highlight of project.highlights.slice(0, 2); track highlight) {
                    <div class="highlight-item">
                      <span class="highlight-icon">✨</span>
                      <span class="highlight-text">{{ highlight }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        <div class="projects-cta" [@fadeInUp]>
          <p>Interested in seeing more of my work?</p>
          <a href="#contact" class="btn btn-primary">
            <span>Let's Work Together</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    @if (selectedProject()) {
      <div 
        class="project-modal" 
        [class.active]="selectedProject()"
        (click)="closeProjectModal()">
        
        <div class="modal-content" (click)="$event.stopPropagation()" [@scaleIn]>
          <button 
            class="modal-close" 
            (click)="closeProjectModal()"
            aria-label="Close project details"
            type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div class="modal-header">
            <h2>{{ selectedProject()?.title }}</h2>
            <div class="modal-badges">
              <span class="category-badge" [attr.data-category]="selectedProject()?.category">
                {{ getCategoryLabel(selectedProject()?.category || []) }}
              </span>
              <span class="status-badge" [attr.data-status]="selectedProject()?.status">
                {{ getStatusLabel(selectedProject()?.status || 'completed') }}
              </span>
            </div>
          </div>

          <div class="modal-body">
            <div class="modal-image">
              <img 
                [src]="selectedProject()?.imageUrl" 
                [alt]="selectedProject()?.title + ' - Detailed view'"
                loading="lazy">
            </div>

            <div class="modal-details">
              <div class="project-description-full">
                <h3>About This Project</h3>
                <p>{{ selectedProject()?.longDescription }}</p>
              </div>

              <div class="project-features">
                <h3>Key Features</h3>
                <ul>
                  @for (feature of selectedProject()?.features; track feature) {
                    <li>{{ feature }}</li>
                  }
                </ul>
              </div>

              <div class="project-highlights-full">
                <h3>Project Highlights</h3>
                <ul>
                  @for (highlight of selectedProject()?.highlights; track highlight) {
                    <li>{{ highlight }}</li>
                  }
                </ul>
              </div>

              <div class="project-tech-full">
                <h3>Technologies Used</h3>
                <div class="tech-grid">
                  @for (tech of selectedProject()?.technologies; track tech) {
                    <span class="tech-tag">{{ tech }}</span>
                  }
                </div>
              </div>

              <div class="project-actions-full">
                @if (selectedProject()?.adminUrl) {
                  <a 
                    [href]="selectedProject()?.adminUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="btn btn-primary">
                    <span>View Live Demo</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15,3 21,3 21,9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                }
                
                @if (selectedProject()?.userUrl) {
                  <a 
                    [href]="selectedProject()?.userUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="btn btn-secondary">
                    <span>View Source Code</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./projects.component.scss'],
  animations: [fadeInUp, staggerAnimation, scaleIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChild('projectsSection') projectsSection!: ElementRef;
  
  projects = signal<Project[]>([]);
  activeCategory = signal<string>('all');
  isVisible = signal(false);
  selectedProject = signal<Project | null>(null);

  categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'fullstack', label: 'Full Stack' }
  ];

  private contentService = inject(ContentService);
  private intersectionObserver = inject(IntersectionObserverService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    this.contentService.projects$.subscribe(projects => {
      if (projects && projects.length > 0) {
        this.projects.set(projects);
        this.cdr.markForCheck(); // Trigger change detection
      }
    });
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(this.projectsSection).subscribe(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          this.isVisible.set(true);
        }
      });
    });
  }

  filteredProjects = (): Project[] => {
    const category = this.activeCategory();
    if (category === 'all') {
      return this.projects();
    }
    return this.projects().filter(project => project.category.includes(category));
  };

  setActiveCategory(category: string): void {
    this.activeCategory.set(category);
  }



  getCategoryLabel(category: string | string[]): string {
    if (Array.isArray(category)) {
      return category.map(c => this.getCategoryLabel(c)).join(', ');
    }
    const categoryMap: { [key: string]: string } = {
      'web': 'Web App',
      'mobile': 'Mobile App',
      'fullstack': 'Full Stack'
    };
    return categoryMap[category] || category;
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'completed': 'Completed',
      'in-progress': 'In Progress',
      'planned': 'Planned'
    };
    return statusMap[status] || status;
  }

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = 'auto';
  }
}