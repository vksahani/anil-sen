import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, Experience } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [fadeInUp, fadeInLeft, fadeInRight, scaleIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChild('experienceSection') experienceSection!: ElementRef;
  @Input() experienceData: any;

  experience = signal<Experience[]>([]);
  isVisible = signal(false);
  expandedItems = signal<Set<string>>(new Set());
  selectedExperience = signal<Experience | null>(null);
  private intersectionObserver = inject(IntersectionObserverService);
  private cdr = inject(ChangeDetectorRef);

  constructor() { }

  ngOnChanges(simples: SimpleChanges) {
    if (simples['experienceData'] && simples['experienceData'].currentValue) {
      this.experience.set(simples['experienceData'].currentValue);
      console.log('experience:', this.experience());
      this.cdr.detectChanges(); // Trigger change detection
    }
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



  openExperienceModal(experience: Experience): void {
    this.selectedExperience.set(experience);
    document.body.style.overflow = 'hidden';
  }

  closeExperienceModal(): void {
    this.selectedExperience.set(null);
    document.body.style.overflow = 'auto';
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