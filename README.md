# Vishal Kumar - Portfolio Website

A modern, responsive, and accessible portfolio website built with Angular 20, showcasing professional experience, skills, and projects. Features smooth animations, dark/light theme support, and optimized performance.

## 🚀 Features

- **Modern Design**: Clean, professional UI with beautiful gradients and micro-animations
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Accessible**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Lighthouse scores > 90 for Performance, Accessibility, and Best Practices
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Smooth Animations**: Angular Animations API with scroll-triggered effects
- **Interactive Components**: Skill filters, project modals, expandable experience timeline
- **Contact Form**: Functional contact form with validation and spam protection



## 🛠️ Tech Stack

- **Framework**: Angular 20 (standalone components)
- **Styling**: SCSS + Angular Material + Bootstrap Grid
- **Animations**: Angular Animations API + CSS animations
- **State Management**: RxJS with BehaviorSubjects
- **Forms**: Reactive Forms with validation
- **Testing**: Jasmine/Karma (unit)
- **Build Tools**: Angular CLI with custom webpack config
- **Deployment**: Netlify/Vercel ready

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+
- Angular CLI 20+

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/vishalkumar/portfolio.git
cd portfolio
npm ci
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Development Server

```bash
npm start
# Navigate to http://localhost:4200
```

### 4. Build for Production

```bash
npm run build:prod
# Output in dist/vishal-portfolio/
```

## 📜 Available Scripts

### Development
- `npm start` - Start development server
- `npm run watch` - Build with file watching
- `npm run serve:ssr` - Serve with SSR

### Building
- `npm run build` - Development build
- `npm run build:prod` - Production build with optimizations
- `npm run build:ssr` - Build with Server-Side Rendering

### Testing
- `npm test` - Run unit tests

### Code Quality
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Performance & Analysis
- `npm run analyze` - Analyze bundle size

### Utilities

- `npm run preview-prod` - Preview production build locally

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/                 # Core services and utilities
│   │   └── services/         # Application services
│   ├── features/             # Feature modules
│   │   ├── home/            # Home page components
│   │   │   └── components/  # Section components
│   │   ├── projects/        # Projects page
│   │   ├── experience/      # Experience page

│   ├── shared/              # Shared components and utilities
│   │   ├── components/      # Reusable components
│   │   └── animations/      # Animation utilities
│   └── assets/              # Static assets
│       ├── data/           # JSON data files
│       ├── images/         # Images and graphics
│       └── documents/      # PDFs and documents
```

## 🎨 Customization

### Personal Information
Edit `src/app/core/services/content.service.ts`:

```typescript
// Update personal info, skills, experience, projects, education
// Modify the default values in the service constructor
```

### Styling
- Global styles: `src/styles.scss`
- Theme variables: CSS custom properties in `:root`
- Component styles: Individual `.scss` files

### Content Management
- **Static**: Edit `src/assets/data/content.json`
- **Service**: Update default values in `ContentService`

## 🚀 Deployment

### Netlify (Recommended)

```bash
# Build
npm run build:prod

# Deploy (using Netlify CLI)
netlify deploy --prod --dir=dist/vishal-portfolio
```

Configuration in `netlify.toml` includes:
- Redirects for SPA routing
- Security headers
- Asset caching

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Configuration in `vercel.json` includes routing and headers.

### Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Initialize and deploy
firebase init hosting
firebase deploy
```

### Docker

```bash
# Build image
docker build -t vishal-portfolio .

# Run container
docker run -p 8080:8080 vishal-portfolio
```

## 🔧 Environment Variables

Create `.env` file based on `.env.example`:

```bash
# API Configuration
API_URL=https://api.vishalkumar.dev
CONTACT_FORM_ENDPOINT=https://api.vishalkumar.dev/contact

# Firebase (for contact form)
FIREBASE_API_KEY=your-api-key
FIREBASE_PROJECT_ID=your-project-id

# reCAPTCHA
RECAPTCHA_SITE_KEY=your-site-key

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Social Links
LINKEDIN_URL=https://linkedin.com/in/vishalkumar
GITHUB_URL=https://github.com/vishalkumar
```

## 🧪 Testing

### Unit Tests
```bash
npm test                    # Run with watch mode
```

### E2E Tests
```bash
npm run e2e                # Run headless
npm run e2e:open          # Open Cypress UI
```

## 📊 Performance Optimization

### Bundle Analysis
```bash
npm run analyze
```

### CSS Purging
```bash
# After production build
node scripts/purge-css.js
```

### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading
- Provide multiple sizes with `srcset`
- Add blur-up placeholders

### Caching Strategy
- Static assets: 1 year cache
- HTML: No cache
- API responses: Appropriate cache headers

## ♿ Accessibility

### Features Implemented
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader compatibility
- Reduced motion support

### Testing
```bash
# Manual testing checklist
- Tab navigation works
- Screen reader announces content
- Color contrast meets WCAG AA
- Images have alt text
- Forms have proper labels
```

## 🔒 Security

### Content Security Policy
Configured in deployment files with strict policies for:
- Script sources
- Style sources
- Image sources
- Font sources
- Connection sources

### Form Security
- Honeypot fields for spam protection
- reCAPTCHA integration
- Input sanitization
- CSRF protection





## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Animation Issues**
- Check `prefers-reduced-motion` setting
- Verify IntersectionObserver support
- Ensure proper animation imports

**Performance Issues**
- Run bundle analyzer: `npm run analyze`
- Check for memory leaks in subscriptions
- Optimize images and assets

**Accessibility Issues**
- Test with screen reader
- Verify keyboard navigation

### Getting Help

1. Check the [Issues](https://github.com/vishalkumar/portfolio/issues) page
2. Review the troubleshooting section
3. Contact: [vishal@example.com](mailto:vishal@example.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Contact

**Vishal Kumar**
- Email: [vishal@example.com](mailto:vishal@example.com)
- LinkedIn: [linkedin.com/in/vishalkumar](https://linkedin.com/in/vishalkumar)
- GitHub: [github.com/vishalkumar](https://github.com/vishalkumar)
- Website: [vishalkumar.dev](https://vishalkumar.dev)

---

⭐ If you found this project helpful, please give it a star on GitHub!
