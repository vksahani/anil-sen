import { Component, OnInit, ChangeDetectionStrategy, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  
  personalInfo = signal<any>(null);
  isVisible = signal(false);
  private hasAnimated = false;

  constructor(
    private contentService: ContentService,
    private intersectionObserver: IntersectionObserverService
  ) {
    this.personalInfo.set(this.contentService.personalInfo);
  }

  ngOnInit(): void {
    this.contentService.personalInfo$.subscribe(info => {
      this.personalInfo.set(info);
    });
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(this.aboutSection).subscribe(entries => {
      entries.forEach(entry => {
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