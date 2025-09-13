import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  activeSection = signal('hero');
  personalInfo: any = null;

  private contentService = inject(ContentService);
  private cdr = inject(ChangeDetectorRef);
  private sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];

  constructor() {
    this.personalInfo = this.contentService.personalInfo;
  }

  ngOnInit(): void {
    this.contentService.personalInfo$.subscribe(info => {
      if (info) {
        this.personalInfo = info;
        this.cdr.detectChanges(); // Trigger change detection
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const scrollPosition = window.scrollY + 100; // Offset for navbar

    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(this.sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        this.activeSection.set(this.sections[i]);
        break;
      }
    }
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection() === sectionId;
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

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    this.closeMenu();
  }
}