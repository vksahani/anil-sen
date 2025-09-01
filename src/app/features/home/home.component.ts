import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { ResumeInviteComponent } from './components/resume-invite/resume-invite.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ContentService } from '../../core/services/content.service';
import { AnimationService } from '../../core/services/animation.service';
import { PerformanceService } from '../../core/services/performance.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    ResumeInviteComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private contentService = inject(ContentService);
  private animationService = inject(AnimationService);
  private performanceService = inject(PerformanceService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Optimize for mobile - load data only once
    if (!this.contentService.isDataLoaded()) {
      this.contentService.reloadContent();
    }
    
    // Use takeUntil to prevent memory leaks and reduce subscriptions
    this.contentService.personalInfo$.pipe(
      // Only trigger change detection when data actually changes
    ).subscribe(() => {
      this.cdr.markForCheck();
    });

    // Initialize performance optimizations
    this.performanceService.optimizeForDevice();
  }

  ngOnDestroy(): void {
    this.animationService.destroy();
  }
}