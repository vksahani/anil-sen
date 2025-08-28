import { Component, OnInit, ChangeDetectionStrategy, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, Skill } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, staggerAnimation, progressBarAnimation } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="skills section" #skillsSection>
      <div class="container">
        <div class="section-header" [@fadeInUp]>
          <h2 class="section-title">Skills & Expertise</h2>
          <p class="section-subtitle">Technologies and tools I work with to bring ideas to life</p>
        </div>

        <div class="skills-filter" [@fadeInUp]>
          <button 
            *ngFor="let category of categories" 
            class="filter-btn"
            [class.active]="activeCategory() === category.key"
            (click)="setActiveCategory(category.key)"
            [attr.aria-label]="'Filter by ' + category.label + ' skills'"
            type="button">
            {{ category.label }}
          </button>
        </div>

        <div class="skills-grid" [@stagger]>
          <div 
            *ngFor="let skill of filteredSkills(); trackBy: trackBySkill" 
            class="skill-card"
            [class.visible]="isVisible()">
            
            <div class="skill-header">
              <div class="skill-info">
                <h3 class="skill-name">{{ skill.name }}</h3>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              
              <div class="skill-icon" [attr.aria-label]="skill.name + ' icon'">
                {{ getSkillIcon(skill.name) }}
              </div>
            </div>

            <div class="skill-description">
              {{ skill.description }}
            </div>

            <div class="skill-progress">
              <div class="progress-track">
                <div 
                  class="progress-fill" 
                  [style.width.%]="isVisible() ? skill.level : 0"
                  [@progressBar]="{ value: isVisible(), params: { width: skill.level } }"
                  [attr.aria-valuenow]="skill.level"
                  [attr.aria-valuemin]="0"
                  [attr.aria-valuemax]="100"
                  role="progressbar"
                  [attr.aria-label]="skill.name + ' proficiency: ' + skill.level + '%'">
                </div>
              </div>
            </div>

            <div class="skill-category">
              <span class="category-badge" [attr.data-category]="skill.category">
                {{ getCategoryLabel(skill.category) }}
              </span>
            </div>
          </div>
        </div>

        <div class="skills-summary" [@fadeInUp]>
          <div class="summary-card">
            <h3>Technical Proficiency</h3>
            <p>
              With {{ personalInfo()?.yearsOfExperience }}+ years of experience, I've mastered a comprehensive 
              stack of modern web technologies. My expertise spans from frontend frameworks like Angular 
              and Ionic to backend technologies including Node.js and Firebase.
            </p>
            
            <div class="proficiency-stats">
              <div class="stat">
                <span class="stat-label">Frontend</span>
                <span class="stat-value">{{ getFrontendAverage() }}%</span>
              </div>
              <div class="stat">
                <span class="stat-label">Backend</span>
                <span class="stat-value">{{ getBackendAverage() }}%</span>
              </div>
              <div class="stat">
                <span class="stat-label">Tools</span>
                <span class="stat-value">{{ getToolsAverage() }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./skills.component.scss'],
  animations: [fadeInUp, staggerAnimation, progressBarAnimation],
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
    { key: 'devops', label: 'DevOps' },
    { key: 'tools', label: 'Tools' }
  ];

  private skillIcons: { [key: string]: string } = {
    'Angular': '🅰️',
    'Ionic': '⚡',
    'TypeScript': '📘',
    'JavaScript': '📜',
    'HTML/CSS': '🎨',
    'Node.js': '🟢',
    'Firebase': '🔥',
    'MongoDB': '🍃',
    'RxJS': '🔄',
    'Git': '📚'
  };

  constructor(
    private contentService: ContentService,
    private intersectionObserver: IntersectionObserverService
  ) {
    this.personalInfo.set(this.contentService.personalInfo);
  }

  ngOnInit(): void {
    this.contentService.skills$.subscribe(skills => {
      this.skills.set(skills);
    });

    this.contentService.personalInfo$.subscribe(info => {
      this.personalInfo.set(info);
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

  trackBySkill(index: number, skill: Skill): string {
    return skill.name;
  }

  getSkillIcon(skillName: string): string {
    return this.skillIcons[skillName] || '⚙️';
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

  getFrontendAverage(): number {
    const frontendSkills = this.skills().filter(skill => skill.category === 'frontend');
    if (frontendSkills.length === 0) return 0;
    const total = frontendSkills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / frontendSkills.length);
  }

  getBackendAverage(): number {
    const backendSkills = this.skills().filter(skill => skill.category === 'backend');
    if (backendSkills.length === 0) return 0;
    const total = backendSkills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / backendSkills.length);
  }

  getToolsAverage(): number {
    const toolsSkills = this.skills().filter(skill => skill.category === 'tools' || skill.category === 'devops');
    if (toolsSkills.length === 0) return 0;
    const total = toolsSkills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / toolsSkills.length);
  }
}