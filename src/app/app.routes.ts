import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/home/components/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience.component').then(m => m.ExperienceComponent)
  },

  {
    path: '**',
    redirectTo: ''
  }
];
