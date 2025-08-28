import { Injectable, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

type IntersectionObserverEntry = {
  target: Element;
  isIntersecting: boolean;
  intersectionRatio: number;
};

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {
  private observer: IntersectionObserver | null = null;
  private entries$ = new Subject<IntersectionObserverEntry[]>();

  constructor() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          this.entries$.next(entries as IntersectionObserverEntry[]);
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '0px 0px -50px 0px'
        }
      );
    }
  }

  observe(element: ElementRef<HTMLElement>): Observable<IntersectionObserverEntry[]> {
    if (this.observer && element.nativeElement) {
      this.observer.observe(element.nativeElement);
    }
    return this.entries$.asObservable();
  }

  unobserve(element: ElementRef<HTMLElement>): void {
    if (this.observer && element.nativeElement) {
      this.observer.unobserve(element.nativeElement);
    }
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}