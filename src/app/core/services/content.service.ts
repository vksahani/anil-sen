import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Skill = {
  name: string;
  level: number;
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
  coursework?: string[];
  honors?: string[];
};

export type PersonalInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
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
  private personalInfoSubject = new BehaviorSubject<PersonalInfo>({
    name: 'Vishal Kumar',
    title: 'Web & Application Developer',
    email: 'vishal@example.com',
    phone: '+91 9876543210',
    location: 'India',
    linkedin: 'https://linkedin.com/in/vishalkumar',
    github: 'https://github.com/vishalkumar',
    website: 'https://vishalkumar.dev',
    bio: 'Passionate Web & Application Developer with 5+ years of experience in building scalable web applications using Angular, Ionic, Node.js, and modern web technologies. Specialized in creating user-centric solutions that drive business growth.',
    profileImage: '/assets/images/profile.jpg',
    resumeUrl: '/assets/documents/vishal-kumar-resume.pdf',
    yearsOfExperience: 5
  });

  private skillsSubject = new BehaviorSubject<Skill[]>([
    { name: 'Angular', level: 95, category: 'frontend', description: 'Expert in Angular framework for building dynamic web applications', icon: 'angular' },
    { name: 'Ionic', level: 90, category: 'frontend', description: 'Proficient in cross-platform mobile app development', icon: 'ionic' },
    { name: 'TypeScript', level: 92, category: 'frontend', description: 'Strong typing and modern JavaScript features', icon: 'typescript' },
    { name: 'JavaScript', level: 88, category: 'frontend', description: 'Core language for web development', icon: 'javascript' },
    { name: 'HTML/CSS', level: 90, category: 'frontend', description: 'Semantic markup and responsive design', icon: 'html5' },
    { name: 'Node.js', level: 85, category: 'backend', description: 'Server-side JavaScript runtime', icon: 'nodejs' },
    { name: 'Firebase', level: 80, category: 'backend', description: 'Backend-as-a-Service platform', icon: 'firebase' },
    { name: 'MongoDB', level: 75, category: 'backend', description: 'NoSQL database management', icon: 'mongodb' },
    { name: 'RxJS', level: 88, category: 'frontend', description: 'Reactive programming with observables', icon: 'rxjs' },
    { name: 'Git', level: 85, category: 'tools', description: 'Version control and collaboration', icon: 'git' }
  ]);

  private experienceSubject = new BehaviorSubject<Experience[]>([
    {
      id: '1',
      company: 'Quadralyst Pvt Ltd',
      position: 'Senior Web Developer',
      startDate: '2021-03',
      endDate: null,
      description: 'Leading frontend development initiatives and mentoring junior developers',
      responsibilities: [
        'Architected and developed scalable web applications using Angular and TypeScript',
        'Implemented responsive designs and optimized application performance',
        'Collaborated with cross-functional teams to deliver high-quality solutions',
        'Mentored junior developers and conducted code reviews'
      ],
      achievements: [
        'Improved application performance by 40% through optimization techniques',
        'Successfully delivered 15+ projects on time and within budget',
        'Reduced bug reports by 60% through comprehensive testing strategies'
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Angular Material', 'Firebase'],
      location: 'Remote'
    },
    {
      id: '2',
      company: 'The Stepping Stone',
      position: 'Frontend Developer',
      startDate: '2019-06',
      endDate: '2021-02',
      description: 'Developed user interfaces and enhanced user experience for web applications',
      responsibilities: [
        'Built responsive web applications using Angular and modern CSS frameworks',
        'Integrated RESTful APIs and managed application state',
        'Collaborated with designers to implement pixel-perfect UI components',
        'Participated in agile development processes and sprint planning'
      ],
      achievements: [
        'Delivered 10+ successful web applications',
        'Improved user engagement by 35% through UX enhancements',
        'Reduced development time by 25% through reusable component library'
      ],
      technologies: ['Angular', 'JavaScript', 'Bootstrap', 'SCSS', 'Node.js'],
      location: 'Hybrid'
    }
  ]);

  private projectsSubject = new BehaviorSubject<Project[]>([
    {
      id: '1',
      title: 'PartyTambola',
      description: 'Interactive online tambola game platform with real-time multiplayer functionality',
      longDescription: 'A comprehensive online tambola (bingo) platform that allows users to create and join games, with real-time synchronization and interactive gameplay features.',
      technologies: ['Angular', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
      features: ['Real-time multiplayer', 'Custom game rooms', 'Voice chat integration', 'Responsive design'],
      imageUrl: '/assets/images/projects/partytambola.jpg',
      demoUrl: 'https://partytambola.com',
      githubUrl: 'https://github.com/vishalkumar/partytambola',
      status: 'completed',
      category: 'web',
      highlights: ['500+ active users', 'Real-time synchronization', 'Cross-platform compatibility']
    },
    {
      id: '2',
      title: 'Durud',
      description: 'E-commerce platform for local artisans and craftsmen',
      longDescription: 'A marketplace connecting local artisans with customers, featuring product catalogs, order management, and payment integration.',
      technologies: ['Angular', 'Ionic', 'Firebase', 'Stripe'],
      features: ['Product catalog', 'Order management', 'Payment integration', 'Vendor dashboard'],
      imageUrl: '/assets/images/projects/durud.jpg',
      demoUrl: 'https://durud.com',
      status: 'completed',
      category: 'fullstack',
      highlights: ['100+ vendors onboarded', 'Mobile-first design', 'Secure payment processing']
    },
    {
      id: '3',
      title: 'Bhautiki Plus',
      description: 'Educational platform for physics learning with interactive simulations',
      longDescription: 'An educational web application providing interactive physics simulations and learning materials for students.',
      technologies: ['Angular', 'Three.js', 'WebGL', 'TypeScript', 'Material Design'],
      features: ['Interactive simulations', 'Progress tracking', 'Quiz system', 'Responsive design'],
      imageUrl: '/assets/images/projects/bhautiki.jpg',
      demoUrl: 'https://bhautikiplus.com',
      status: 'completed',
      category: 'web',
      highlights: ['1000+ students enrolled', '3D physics simulations', 'Gamified learning']
    }
  ]);

  private educationSubject = new BehaviorSubject<Education[]>([
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Technology',
      field: 'Computer Science Engineering',
      startYear: 2015,
      endYear: 2019,
      grade: '8.2 CGPA',
      coursework: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems', 'Software Engineering'],
      honors: ['Dean\'s List', 'Best Project Award']
    }
  ]);

  // Getters for observables
  get personalInfo$(): Observable<PersonalInfo> {
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
  get personalInfo(): PersonalInfo {
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