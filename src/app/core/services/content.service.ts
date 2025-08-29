import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
    { name: 'NodeJS', category: 'backend', description: 'Server-side JavaScript runtime', icon: 'nodejs' },
    { name: 'HTML', category: 'frontend', description: 'Markup language for web pages', icon: 'html5' },
    { name: 'CSS', category: 'frontend', description: 'Styling language for web pages', icon: 'css3' },
    { name: 'SCSS', category: 'frontend', description: 'CSS preprocessor', icon: 'sass' },
    { name: 'Bootstrap', category: 'frontend', description: 'CSS framework', icon: 'bootstrap' },
    { name: 'JavaScript', category: 'frontend', description: 'Programming language for web', icon: 'javascript' },
    { name: 'TypeScript', category: 'frontend', description: 'Typed JavaScript', icon: 'typescript' },
    { name: 'VS Code', category: 'tools', description: 'Code editor', icon: 'vscode' },
    { name: 'JSON Server', category: 'tools', description: 'Mock REST API', icon: 'json' },
    { name: 'Ionic', category: 'frontend', description: 'Cross-platform mobile framework', icon: 'ionic' },
    { name: 'MongoDB', category: 'backend', description: 'NoSQL database', icon: 'mongodb' },
    { name: 'Firebase', category: 'backend', description: 'Backend-as-a-Service platform', icon: 'firebase' },
    { name: 'Angular', category: 'frontend', description: 'Web application framework', icon: 'angular' },
    { name: 'MVC', category: 'backend', description: 'Architectural pattern', icon: 'mvc' },
    { name: 'Capacitor', category: 'tools', description: 'Native mobile app runtime', icon: 'capacitor' },
    { name: 'Firebase Cloud', category: 'backend', description: 'Cloud functions and hosting', icon: 'firebase' },
    { name: 'Cordova', category: 'tools', description: 'Mobile app development platform', icon: 'cordova' },
    { name: 'GitHub', category: 'tools', description: 'Version control platform', icon: 'github' },
    { name: 'JWT', category: 'backend', description: 'JSON Web Tokens', icon: 'jwt' },
    { name: 'Express', category: 'backend', description: 'Node.js web framework', icon: 'express' },
    { name: 'Mongoose', category: 'backend', description: 'MongoDB object modeling', icon: 'mongoose' },
    { name: 'AnalogJS', category: 'frontend', description: 'Angular meta-framework', icon: 'analog' },
    { name: 'Xcode', category: 'tools', description: 'iOS development IDE', icon: 'xcode' },
    { name: 'Angular Material', category: 'frontend', description: 'Material Design components', icon: 'material' },
    { name: 'Android Studio', category: 'tools', description: 'Android development IDE', icon: 'android' }
  ]);

  private experienceSubject = new BehaviorSubject<Experience[]>([
    {
      id: '1',
      company: 'Quadralyst Pvt Ltd',
      position: 'Junior Developer',
      startDate: '2022-12',
      endDate: null,
      description: 'A company providing software development services',
      responsibilities: [
        'Design and develop high-performance web and mobile applications using Angular and Ionic',
        'Collaborate with cross-functional teams to deliver innovative software solutions and features',
        'Optimize application performance, scalability, and user experience',
        'Implement secure authentication systems and access controls (Firebase Auth, JWT)',
        'Integrate Google GenAI for dynamic content generation and document analysis workflows',
        'Develop responsive UI components ensuring seamless experience across devices'
      ],
      achievements: [
        'Played an integral role in designing and developing high-performance web applications',
        'Collaborated closely with cross-functional teams to create innovative software solutions',
        'Optimized performance, scalability, and user experience'
      ],
      technologies: ['Angular', 'Ionic', 'TypeScript', 'Firebase', 'JWT', 'Google GenAI'],
      location: 'Indore',
      companyUrl: 'https://quadralyst.com/'
    },
    {
      id: '2',
      company: 'The Stepping Stone (Training Institute)',
      position: 'Angular Developer Intern',
      startDate: '2022-06',
      endDate: '2022-10',
      description: 'A training institute focusing on software development',
      responsibilities: [
        'Contributed to feature implementation across multiple Angular projects',
        'Assisted in transforming design mockups into functional UI components',
        'Participated in code reviews and debugging to improve code quality and performance',
        'Conducted manual testing and bug-fixing to ensure reliability and adherence to requirements',
        'Gained exposure to the entire development lifecycle, from concept to deployment'
      ],
      achievements: [
        'Honed development skills through practical, real-world project involvement',
        'Contributed to the successful implementation of various features',
        'Gained comprehensive understanding of the development lifecycle'
      ],
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
      location: 'Indore',
      companyUrl: 'https://steppingstone.in/'
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
      institution: 'ShriRam College Of Engineering and Management',
      degree: 'Bachelor of Engineering',
      field: 'Mechanical Engineering',
      startYear: 2016,
      endYear: 2020,
      grade: '8.52/10 CGPA',
      location: 'Banmore'
    },
    {
      id: '2',
      institution: 'Bright Convent Higher Secondary School',
      degree: 'Higher Secondary',
      field: 'Science',
      startYear: 2015,
      endYear: 2016,
      grade: '81.2/100',
      location: 'Banmore'
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