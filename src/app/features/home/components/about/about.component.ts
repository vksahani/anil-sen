import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, fadeInLeft, fadeInRight } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [fadeInUp, fadeInLeft, fadeInRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @Input() personalData: any;

  personalInfo = signal<any>(null);
  statisticsData = signal<any>({projectsCompleted: 15, happyClients: 12, technologiesMastered: 10});
  isVisible = signal(false);
  private hasAnimated = false;
  private intersectionObserver = inject(IntersectionObserverService);
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(simples: SimpleChanges) {
    if (simples['personalData'] && simples['personalData'].currentValue) {
      this.personalInfo.set(simples['personalData'].currentValue);

      if(this.personalInfo().statistics) {
        // this.statisticsData.set(this.personalInfo().statistics);
        this.statisticsData.set({projectsCompleted: 15, happyClients: 12, technologiesMastered: 10});
      } else {
        this.statisticsData.set({projectsCompleted: 15, happyClients: 12, technologiesMastered: 10});
      }
      
      console.log('personalInfo:', this.personalInfo());
    }
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(this.aboutSection).subscribe((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          this.isVisible.set(true);
          if (!this.hasAnimated) {
            this.animateCounters();
            this.hasAnimated = true;
          }
        }
      });
    });
  }

  private animateCounters(): void {
    const statNumbers = this.aboutSection.nativeElement.querySelectorAll('.stat-number');

    statNumbers.forEach((element: HTMLElement) => {
      const target = parseInt(element.getAttribute('data-target') || '0');
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current).toString();
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toString();
        }
      };

      updateCounter();
    });
  }
}