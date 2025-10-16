import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit {
  @Input() appLazyLoad!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = this.appLazyLoad;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      observer.observe(this.el.nativeElement);
    } else {
      // Fallback for browsers without IntersectionObserver
      this.el.nativeElement.src = this.appLazyLoad;
    }
  }
}