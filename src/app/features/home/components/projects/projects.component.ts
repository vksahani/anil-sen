import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, Project } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, staggerAnimation, scaleIn } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [fadeInUp, staggerAnimation, scaleIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('projectsSection') projectsSection!: ElementRef;
  @Input() projectData: any;
  
  private readonly intersectionObserver = inject(IntersectionObserverService);
  private readonly cdr = inject(ChangeDetectorRef);

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

  constructor() {}

  ngOnChanges(simples: SimpleChanges) {
    if (simples['projectData'] && simples['projectData'].currentValue) {
      this.projects.set(simples['projectData'].currentValue);
      console.log('projects:', this.projects());
      this.cdr.detectChanges(); // Trigger change detection
    }
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