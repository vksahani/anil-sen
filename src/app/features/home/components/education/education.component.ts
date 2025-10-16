import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject, Input, SimpleChanges } from '@angular/core';
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
export class EducationComponent implements AfterViewInit {
  @ViewChild('educationSection') educationSection!: ElementRef;
  @Input() educationData: any;
  
  education = signal<Education[]>([]);
  isVisible = signal(false);
  private intersectionObserver = inject(IntersectionObserverService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnChanges(simples: SimpleChanges) {
    if (simples['educationData'] && simples['educationData'].currentValue) {
      this.education.set(simples['educationData'].currentValue);
      console.log('education:', this.education());
      this.cdr.detectChanges(); // Trigger change detection
    }
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