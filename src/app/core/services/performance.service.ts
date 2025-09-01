import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  
  isMobile(): boolean {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  isLowEndDevice(): boolean {
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
    return this.isMobile() || this.isLowEndDevice() || 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  optimizeForDevice(): void {
    if (this.shouldReduceAnimations()) {
      document.body.classList.add('reduce-animations');
    }
    
    if (this.isMobile()) {
      document.body.classList.add('mobile-device');
    }
  }
}