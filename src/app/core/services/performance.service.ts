import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  isMobile(): boolean {
    if (!this.isBrowser) return false;
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  isLowEndDevice(): boolean {
    if (!this.isBrowser) return false;
    
    // Check for low-end device indicators
    const connection = (navigator as any).connection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    
    return (
      hardwareConcurrency <= 2 || // 2 or fewer CPU cores
      (connection && connection.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) ||
      (connection && connection.downlink && connection.downlink < 1.5) // Less than 1.5 Mbps
    );
  }

  shouldReduceAnimations(): boolean {
    if (!this.isBrowser) return true; // Default to reduced animations on server
    
    return this.isMobile() || this.isLowEndDevice() || 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  optimizeForDevice(): void {
    if (!this.isBrowser) return;
    
    if (this.shouldReduceAnimations()) {
      document.body.classList.add('reduce-animations');
    }
    
    if (this.isMobile()) {
      document.body.classList.add('mobile-device');
    }

    // Add performance monitoring
    this.monitorPerformance();
  }

  private monitorPerformance(): void {
    if (!this.isBrowser) return;
    
    // Monitor frame rate and adjust animations accordingly
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.checkFrameRate();
      });
    }
  }

  private checkFrameRate(): void {
    if (!this.isBrowser) return;
    
    let lastTime = performance.now();
    let frameCount = 0;
    const targetFPS = 60;
    const checkDuration = 1000; // 1 second

    const checkFrame = (currentTime: number) => {
      frameCount++;
      
      if (currentTime - lastTime >= checkDuration) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        // If FPS is consistently low, reduce animations
        if (fps < targetFPS * 0.8) { // Less than 48 FPS
          document.body.classList.add('reduce-animations');
        }
      }

      if (!document.body.classList.contains('reduce-animations')) {
        requestAnimationFrame(checkFrame);
      }
    };

    requestAnimationFrame(checkFrame);
  }
}