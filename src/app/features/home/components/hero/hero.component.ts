import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, signal, AfterViewInit, ElementRef, ViewChild, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../../core/services/content.service';
import { fadeInUp, fadeInLeft, fadeInRight } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [fadeInUp, fadeInLeft, fadeInRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('typedElement') typedElement!: ElementRef;
  @ViewChild('heroSection') heroSection!: ElementRef;
  @Input() personalData: any;
  
  personalInfo = signal<any>(null);
  private typedInstance: any;
  private animationFrameId: number | null = null;
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(simples: SimpleChanges) {
    if (simples['personalData'] && simples['personalData'].currentValue) {
      this.personalInfo.set(simples['personalData'].currentValue);
      console.log('personalInfo:', this.personalInfo());
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  ngAfterViewInit(): void {
    this.initializeTypedText();
    this.initializeParticleAnimation();
  }

  ngOnDestroy(): void {
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private async initializeTypedText(): Promise<void> {
    try {
      const { default: Typed } = await import('typed.js');
      
      const typedStrings = [
        'Building Amazing Web Applications',
        'Creating Mobile-First Experiences', 
        'Developing Scalable Solutions',
        'Crafting User-Centric Interfaces'
      ];

      this.typedInstance = new Typed(this.typedElement.nativeElement, {
        strings: typedStrings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
      });
    } catch (error) {
      console.warn('Typed.js not available, using fallback');
      this.typedElement.nativeElement.textContent = 'Building Amazing Web Applications';
    }
  }

  private initializeParticleAnimation(): void {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    const shapes = this.heroSection.nativeElement.querySelectorAll('.shape');
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      shapes.forEach((shape: HTMLElement, index: number) => {
        const offset = index * 2;
        const x = Math.sin(time + offset) * 20;
        const y = Math.cos(time + offset) * 15;
        
        shape.style.transform = `translate(${x}px, ${y}px) rotate(${time * 20 + offset * 45}deg)`;
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    // Only animate if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
    }
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}