import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../../core/services/content.service';
import { IntersectionObserverService } from '../../../../core/services/intersection-observer.service';
import { fadeInUp, fadeInLeft, fadeInRight } from '../../../../shared/animations/animations';
import { AboutComponent } from "../about/about.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [fadeInUp, fadeInLeft, fadeInRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection') contactSection!: ElementRef;
  @Input() personalData: any;
  
  personalInfo = signal<any>(null);
  private intersectionObserver = inject(IntersectionObserverService);
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(simples: SimpleChanges) {
    if (simples['personalData'] && simples['personalData'].currentValue) {
      this.personalInfo.set(simples['personalData'].currentValue);
      console.log('personalInfo:', this.personalInfo());
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  ngAfterViewInit(): void {
    this.intersectionObserver.observe(this.contactSection).subscribe(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          // Trigger any scroll-based animations here
        }
      });
    });
  }



  async copyToClipboard(text: string, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(text);
      
      // Show temporary feedback
      const button = event.target as HTMLElement;
      const originalContent = button.innerHTML;
      button.innerHTML = '✓';
      button.style.color = '#10b981';
      
      setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.color = '';
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }
}