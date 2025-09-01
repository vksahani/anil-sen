import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AnimationService } from '../../core/services/animation.service';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() animationClass: string = 'animate-fade-in-up';
  @Input() animationDelay: number = 0;
  @Input() threshold: number = 0.1;

  private elementRef = inject(ElementRef);
  private animationService = inject(AnimationService);

  ngOnInit(): void {
    // Add initial state
    this.elementRef.nativeElement.classList.add('animate-on-scroll');
    
    // Set up intersection observer through animation service
    if (this.animationDelay > 0) {
      setTimeout(() => {
        this.animationService.observeElement(this.elementRef);
      }, this.animationDelay);
    } else {
      this.animationService.observeElement(this.elementRef);
    }
  }

  ngOnDestroy(): void {
    // Cleanup is handled by the animation service
  }
}