import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { PerformanceService } from './core/services/performance.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  title = 'Vishal Kumar - Web & Application Developer';

  private titleService = inject(Title);
  private performanceService = inject(PerformanceService);

  constructor() {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.performanceService.optimizeForDevice();
  }
}
