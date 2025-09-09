import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, Skill } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, staggerAnimation } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="skills section" #skillsSection>
      <div class="container">
        <div class="section-header" [@fadeInUp]>
          <h2 class="section-title">Skills & Technologies</h2>
          <p class="section-subtitle">Technologies and tools I work with</p>
        </div>

        <div class="card-brooklyn">
          <div class="card-content">
            <div class="skills-filter" [@fadeInUp]>
              @for (category of categories; track category.key) {
                <button 
                  class="filter-btn"
                  [class.active]="activeCategory() === category.key"
                  (click)="setActiveCategory(category.key)"
                  [attr.aria-label]="'Filter by ' + category.label + ' skills'"
                  type="button">
                  {{ category.label }}
                </button>
              }
            </div>

            <div class="skills-grid" [@stagger]>
              @for (skill of filteredSkills(); track skill.name) {
                <div 
                  class="skill-card card-glass-premium"
                  [class.visible]="isVisible()">
                  
                  <div class="skill-icon" [attr.aria-label]="skill.name + ' icon'">
                    <img [src]="skill.icon" [alt]="skill.name + ' icon'" class="skill-icon-img">
                  </div>
                  
                  <h3 class="skill-name">{{ skill.name }}</h3>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./skills.component.scss'],
  animations: [fadeInUp, staggerAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit, AfterViewInit {
  @ViewChild('skillsSection') skillsSection!: ElementRef;

  skills = signal<Skill[]>([]);
  personalInfo = signal<any>(null);
  activeCategory = signal<string>('all');
  isVisible = signal(false);

  categories = [
    { key: 'all', label: 'All Skills' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'tools', label: 'Tools' }
  ];



  private contentService = inject(ContentService);
  private intersectionObserver = inject(IntersectionObserverService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.personalInfo.set(this.contentService.personalInfo);
  }

  ngOnInit(): void {
    this.contentService.skills$.subscribe(skills => {
      if (skills && skills.length > 0) {
        this.skills.set(skills);
        this.cdr.detectChanges(); // Trigger change detection
      }
    });

    this.contentService.personalInfo$.subscribe(info => {
      if (info) {
        this.personalInfo.set(info);
        this.cdr.detectChanges(); // Trigger change detection
      }
    });
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(this.skillsSection).subscribe(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          this.isVisible.set(true);
        }
      });
    });
  }

  filteredSkills = (): Skill[] => {
    const category = this.activeCategory();
    if (category === 'all') {
      return this.skills();
    }
    return this.skills().filter(skill => skill.category === category);
  };

  setActiveCategory(category: string): void {
    this.activeCategory.set(category);
  }





  getCategoryLabel(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'frontend': 'Frontend',
      'backend': 'Backend',
      'devops': 'DevOps',
      'tools': 'Tools'
    };
    return categoryMap[category] || category;
  }


}