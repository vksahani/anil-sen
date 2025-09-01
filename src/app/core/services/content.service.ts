import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';

export type Skill = {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools';
  description: string;
  icon?: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  location: string;
  companyUrl?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'web' | 'mobile' | 'fullstack';
  highlights: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  grade?: string;
  location?: string;
  coursework?: string[];
  honors?: string[];
};

export type PersonalInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth?: string;
  linkedin: string;
  github: string;
  website: string;
  bio: string;
  profileImage: string;
  resumeUrl: string;
  yearsOfExperience: number;
};

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private personalInfoSubject = new BehaviorSubject<PersonalInfo | null>(null);

  private skillsSubject = new BehaviorSubject<Skill[]>([]);

  private experienceSubject = new BehaviorSubject<Experience[]>([]);

  private projectsSubject = new BehaviorSubject<Project[]>([]);

  private educationSubject = new BehaviorSubject<Education[]>([]);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadContent();
    }
  }

  private loadContent(): void {
    this.http.get<any>('/assets/data/content.json').pipe(
      catchError(error => {
        console.error('Error loading content:', error);
        return of(null);
      }),
      tap(data => {
        if (data) {
          console.log('Content loaded successfully:', data);
        }
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          if (data.personalInfo) {
            this.personalInfoSubject.next(data.personalInfo);
          }
          if (data.skills) {
            this.skillsSubject.next(data.skills);
          }
          if (data.experience) {
            this.experienceSubject.next(data.experience);
          }
          if (data.projects) {
            this.projectsSubject.next(data.projects);
          }
          if (data.education) {
            this.educationSubject.next(data.education);
          }
        }
      }
    });
  }

  // Method to reload content manually
  reloadContent(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadContent();
    }
  }

  // Method to check if data is loaded
  isDataLoaded(): boolean {
    return this.personalInfoSubject.value !== null && 
           this.skillsSubject.value.length > 0 && 
           this.experienceSubject.value.length > 0 && 
           this.projectsSubject.value.length > 0 && 
           this.educationSubject.value.length > 0;
  }

  // Getters for observables
  get personalInfo$(): Observable<PersonalInfo | null> {
    return this.personalInfoSubject.asObservable();
  }

  get skills$(): Observable<Skill[]> {
    return this.skillsSubject.asObservable();
  }

  get experience$(): Observable<Experience[]> {
    return this.experienceSubject.asObservable();
  }

  get projects$(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  get education$(): Observable<Education[]> {
    return this.educationSubject.asObservable();
  }

  // Getters for current values
  get personalInfo(): PersonalInfo | null {
    return this.personalInfoSubject.value;
  }

  get skills(): Skill[] {
    return this.skillsSubject.value;
  }

  get experience(): Experience[] {
    return this.experienceSubject.value;
  }

  get projects(): Project[] {
    return this.projectsSubject.value;
  }

  get education(): Education[] {
    return this.educationSubject.value;
  }



  // Filter methods
  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getProjectsByCategory(category: string): Project[] {
    return this.projects.filter(project => project.category === category);
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
}