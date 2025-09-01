import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, inject } from '@angular/core';
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
export class HomeComponent implements OnInit {
  private contentService = inject(ContentService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Ensure data is loaded when component initializes
    if (!this.contentService.isDataLoaded()) {
      this.contentService.reloadContent();
    }
    
    // Subscribe to any data changes and trigger change detection
    this.contentService.personalInfo$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }
}