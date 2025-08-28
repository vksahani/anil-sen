import { Component, ChangeDetectionStrategy, OnInit, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  personalInfo: any = null;

  constructor(
    public themeService: ThemeService,
    private contentService: ContentService
  ) {
    this.personalInfo = this.contentService.personalInfo;
  }

  ngOnInit(): void {
    this.contentService.personalInfo$.subscribe(info => {
      this.personalInfo = info;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (window.innerWidth > 768) {
      this.isMenuOpen.set(false);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}