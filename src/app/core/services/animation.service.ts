import { Injectable, ElementRef, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AnimationService {
    private intersectionObserver?: IntersectionObserver;
    private animatedElements = new Set<Element>();
    private isBrowser: boolean;

    constructor(
        private ngZone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            this.initIntersectionObserver();
        }
    }

    private initIntersectionObserver(): void {
        if (!this.isBrowser || !('IntersectionObserver' in window)) {
            return;
        }

        this.ngZone.runOutsideAngular(() => {
            this.intersectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('in-view');
                            this.animatedElements.add(entry.target);
                            // Stop observing once animated to improve performance
                            this.intersectionObserver?.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '50px 0px -50px 0px'
                }
            );
        });
    }

    observeElement(element: ElementRef<HTMLElement>): void {
        if (!this.isBrowser) return;
        
        if (this.intersectionObserver && element.nativeElement) {
            element.nativeElement.classList.add('animate-on-scroll');
            this.intersectionObserver.observe(element.nativeElement);
        }
    }

    observeElements(elements: ElementRef<HTMLElement>[]): void {
        elements.forEach(element => this.observeElement(element));
    }

    // Optimized animation utilities
    animateWithDelay(element: ElementRef<HTMLElement>, animationClass: string, delay: number = 0): void {
        if (!this.isBrowser || !element.nativeElement) return;

        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                element.nativeElement.classList.add(animationClass);
            }, delay);
        });
    }

    // Batch animate multiple elements with staggered delays
    staggeredAnimation(elements: ElementRef<HTMLElement>[], animationClass: string, staggerDelay: number = 100): void {
        elements.forEach((element, index) => {
            this.animateWithDelay(element, animationClass, index * staggerDelay);
        });
    }

    // Performance-aware animation based on device capabilities
    conditionalAnimate(element: ElementRef<HTMLElement>, animationClass: string, condition?: () => boolean): void {
        if (!this.isBrowser || !element.nativeElement) return;

        const shouldAnimate = condition ? condition() : this.shouldEnableAnimations();

        if (shouldAnimate) {
            element.nativeElement.classList.add(animationClass);
        } else {
            // Apply end state without animation
            element.nativeElement.classList.add('no-animation');
        }
    }

    private shouldEnableAnimations(): boolean {
        if (!this.isBrowser) return false;
        
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return false;
        }

        // Check for low-end device indicators
        const connection = (navigator as any).connection;
        const hardwareConcurrency = navigator.hardwareConcurrency || 1;

        const isLowEndDevice = (
            hardwareConcurrency <= 2 ||
            (connection && connection.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) ||
            (connection && connection.downlink && connection.downlink < 1.5)
        );

        return !isLowEndDevice;
    }

    // Clean up resources
    destroy(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        this.animatedElements.clear();
    }

    // Utility to pause/resume animations for performance
    pauseAnimations(): void {
        if (!this.isBrowser) return;
        document.body.classList.add('animations-paused');
    }

    resumeAnimations(): void {
        if (!this.isBrowser) return;
        document.body.classList.remove('animations-paused');
    }

    // Reduce animations during heavy operations
    reduceAnimationsDuring(operation: () => Promise<void>): Promise<void> {
        this.pauseAnimations();
        return operation().finally(() => {
            // Resume animations after a short delay
            setTimeout(() => this.resumeAnimations(), 100);
        });
    }
}