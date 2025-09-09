import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, Education } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, fadeInLeft, fadeInRight } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  animations: [fadeInUp, fadeInLeft, fadeInRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent implements OnInit, AfterViewInit {
  @ViewChild('educationSection') educationSection!: ElementRef;
  
  education = signal<Education[]>([]);
  isVisible = signal(false);

  private contentService = inject(ContentService);
  private intersectionObserver = inject(IntersectionObserverService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    this.contentService.education$.subscribe(education => {
      if (education && education.length > 0) {
        this.education.set(education);
        this.cdr.detectChanges(); // Trigger change detection
      }
    });
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(this.educationSection).subscribe(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          this.isVisible.set(true);
        }
      });
    });
  }
}