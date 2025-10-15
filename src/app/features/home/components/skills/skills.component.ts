import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, Skill } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, staggerAnimation } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [fadeInUp, staggerAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('skillsSection') skillsSection!: ElementRef;
  @Input() skillData: any;

  private readonly intersectionObserver = inject(IntersectionObserverService);
  private readonly cdr = inject(ChangeDetectorRef);

  skills = signal<Skill[]>([]);
  activeCategory = signal<string>('all');
  isVisible = signal(false);

  categories = [
    { key: 'all', label: 'All Skills' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'tools', label: 'Tools' }
  ];

  constructor() {}

  ngOnChanges(simples: SimpleChanges) {
    if (simples['skillData'] && simples['skillData'].currentValue) {
      this.skills.set(simples['skillData'].currentValue);
      console.log('skills:', this.skills());
      this.cdr.detectChanges(); // Trigger change detection
    }
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