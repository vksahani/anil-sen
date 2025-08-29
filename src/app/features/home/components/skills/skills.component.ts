import { Component, OnInit, ChangeDetectionStrategy, signal, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
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
            
            <div class="skill-icon" [attr.aria-label]="skill.name + ' icon'">
              {{ getSkillIcon(skill.name) }}
            </div>
            
            <h3 class="skill-name">{{ skill.name }}</h3>
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

  private skillIcons: { [key: string]: string } = {
    'NodeJS': '🟢',
    'HTML': '🌐',
    'CSS': '🎨',
    'SCSS': '💅',
    'Bootstrap': '🅱️',
    'JavaScript': '📜',
    'TypeScript': '📘',
    'VS Code': '💻',
    'JSON Server': '📊',
    'Ionic': '⚡',
    'MongoDB': '🍃',
    'Firebase': '🔥',
    'Angular': '🅰️',
    'MVC': '🏗️',
    'Capacitor': '📱',
    'Firebase Cloud': '☁️',
    'Cordova': '📲',
    'GitHub': '🐙',
    'JWT': '🔐',
    'Express': '🚀',
    'Mongoose': '🦫',
    'AnalogJS': '⚡',
    'Xcode': '🍎',
    'Angular Material': '🎯',
    'Android Studio': '🤖'
  };

  private contentService = inject(ContentService);
  private intersectionObserver = inject(IntersectionObserverService);

  constructor() {
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


}