import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
    selector: 'app-theme-demo',
    standalone: true,
    imports: [CommonModule, ThemeToggleComponent],
    template: `
    <div class="theme-demo">
      <div class="demo-header">
        <h3>Theme Toggle Demo</h3>
        <app-theme-toggle></app-theme-toggle>
      </div>
      
      <div class="demo-content">
        <div class="demo-card card-theme-aware">
          <h4>Sample Card</h4>
          <p>This card demonstrates the dark/light theme switching with smooth transitions.</p>
          <button class="btn btn-primary">Primary Button</button>
          <button class="btn btn-theme-outline">Outline Button</button>
        </div>
        

        
        <div class="demo-badges">
          <span class="badge-theme badge-primary">Primary Badge</span>
          <span class="badge-theme badge-secondary">Secondary Badge</span>
        </div>
      </div>
    </div>
  `,
    styleUrls: ['./theme-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeDemoComponent {
    public themeService = inject(ThemeService);
}