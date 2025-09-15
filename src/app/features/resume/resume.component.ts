import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService, ResumeData } from '../../core/services/resume.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  resumeData: ResumeData | null = null;
  loading = true;
  error: string | null = null;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.loadResumeData();
  }

  loadResumeData(): void {
    this.loading = true;
    this.error = null;
    
    this.resumeService.loadResumeData().subscribe({
      next: (data) => {
        this.resumeData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load resume data';
        this.loading = false;
        console.error('Error loading resume data:', err);
      }
    });
  }

  formatDate(dateString: string): string {
    return this.resumeService.formatDate(dateString);
  }

  printResume(): void {
    window.print();
  }

  downloadPDF(): void {
    // This would typically integrate with a PDF generation service
    // For now, we'll use the browser's print to PDF functionality
    this.printResume();
  }
}