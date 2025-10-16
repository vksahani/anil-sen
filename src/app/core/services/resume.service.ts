import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

export interface Skills {
  technical: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  certifications: Certification[];
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumeDataSubject = new BehaviorSubject<ResumeData | null>(null);
  public resumeData$ = this.resumeDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadResumeData(): Observable<ResumeData> {
    return this.http.get<any>('/assets/data/content.json').pipe(
      tap(data => {
        const resumeData = this.mapContentToResumeData(data);
        this.resumeDataSubject.next(resumeData);
      }),
      catchError(error => {
        console.error('Error loading resume data:', error);
        throw error;
      })
    );
  }

  private mapContentToResumeData(content: any): ResumeData {
    // Group skills by category
    const skillsByCategory = content.skills.reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {});

    return {
      personalInfo: {
        name: content.personalInfo.name,
        title: content.personalInfo.title,
        email: content.personalInfo.email,
        phone: content.personalInfo.phone,
        location: content.personalInfo.location,
        linkedin: content.personalInfo.linkedin,
        github: content.personalInfo.github,
        website: content.personalInfo.website
      },
      summary: content.personalInfo.bio,
      experience: content.experience.map((exp: any) => ({
        company: exp.company,
        position: exp.position,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate || 'Present',
        responsibilities: exp.responsibilities || []
      })),
      education: content.education.map((edu: any) => ({
        institution: edu.institution,
        degree: `${edu.degree} in ${edu.field}`,
        location: edu.location,
        graduationDate: `${edu.endYear}-05`,
        gpa: edu.grade
      })),
      skills: {
        technical: skillsByCategory.frontend || [],
        frameworks: [...(skillsByCategory.frontend || []), ...(skillsByCategory.backend || [])].filter((skill, index, arr) => arr.indexOf(skill) === index),
        databases: skillsByCategory.backend?.filter((skill: string) => 
          skill.toLowerCase().includes('mongo') || 
          skill.toLowerCase().includes('sql') || 
          skill.toLowerCase().includes('firebase')
        ) || [],
        tools: skillsByCategory.tools || []
      },
      projects: content.projects.map((project: any) => ({
        name: project.title,
        description: project.description,
        technologies: project.technologies,
        highlights: project.highlights || project.features || []
      })),
      certifications: [] // Add certifications if available in content.json
    };
  }

  getResumeData(): ResumeData | null {
    return this.resumeDataSubject.value;
  }

  updateResumeData(data: Partial<ResumeData>): void {
    const currentData = this.resumeDataSubject.value;
    if (currentData) {
      const updatedData = { ...currentData, ...data };
      this.resumeDataSubject.next(updatedData);
    }
  }

  formatDate(dateString: string): string {
    if (dateString.toLowerCase() === 'present') {
      return 'Present';
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }
}