import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-performance-monitor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="performance-monitor" *ngIf="showMonitor">
      <div class="monitor-item">
        <span class="label">FPS:</span>
        <span class="value" [class.warning]="fps < 50" [class.critical]="fps < 30">{{ fps }}</span>
      </div>
      <div class="monitor-item">
        <span class="label">Memory:</span>
        <span class="value">{{ memoryUsage }}MB</span>
      </div>
      <div class="monitor-item">
        <span class="label">Animations:</span>
        <span class="value" [class.disabled]="animationsDisabled">{{ animationsDisabled ? 'OFF' : 'ON' }}</span>
      </div>
    </div>
  `,
  styles: [`
    .performance-monitor {
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      display: flex;
      gap: 12px;
    }

    .monitor-item {
      display: flex;
      gap: 4px;
    }

    .label {
      opacity: 0.7;
    }

    .value {
      font-weight: bold;
      color: #4ade80;
    }

    .value.warning {
      color: #fbbf24;
    }

    .value.critical {
      color: #ef4444;
    }

    .value.disabled {
      color: #6b7280;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceMonitorComponent implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private isBrowser: boolean;
  
  fps = 0;
  memoryUsage = 0;
  animationsDisabled = false;
  showMonitor = false;

  private frameCount = 0;
  private lastTime = 0;
  private animationFrame?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.lastTime = performance.now();
    }
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    
    // Only show in development or when explicitly enabled
    this.showMonitor = !!(window as any).enablePerformanceMonitor || 
                      localStorage.getItem('showPerformanceMonitor') === 'true';

    if (this.showMonitor) {
      this.startMonitoring();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private startMonitoring(): void {
    this.updateMetrics();
  }

  private updateMetrics(): void {
    if (!this.isBrowser) return;
    
    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = currentTime;

      // Update memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        this.memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      }

      // Check if animations are disabled
      this.animationsDisabled = document.body.classList.contains('reduce-animations');

      this.cdr.detectChanges();
    }

    this.animationFrame = requestAnimationFrame(() => this.updateMetrics());
  }
}