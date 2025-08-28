import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const fadeInLeft = trigger('fadeInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-30px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(30px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);

export const slideInUp = trigger('slideInUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)' }),
    animate('500ms ease-out', style({ transform: 'translateY(0)' }))
  ])
]);

export const staggerAnimation = trigger('stagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      stagger(100, [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(100%)' })
    ], { optional: true }),
    query(':leave', [
      animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-100%)' }))
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ], { optional: true })
  ])
]);

export const pulseAnimation = trigger('pulse', [
  state('normal', style({ transform: 'scale(1)' })),
  state('pulsed', style({ transform: 'scale(1.05)' })),
  transition('normal <=> pulsed', animate('300ms ease-in-out'))
]);

export const typewriterAnimation = trigger('typewriter', [
  transition(':enter', [
    animate('2s steps(40)', keyframes([
      style({ width: '0', opacity: 1, offset: 0 }),
      style({ width: '100%', opacity: 1, offset: 1 })
    ]))
  ])
]);

export const floatingAnimation = trigger('floating', [
  transition('* => *', [
    animate('3s ease-in-out infinite', keyframes([
      style({ transform: 'translateY(0px)', offset: 0 }),
      style({ transform: 'translateY(-10px)', offset: 0.5 }),
      style({ transform: 'translateY(0px)', offset: 1 })
    ]))
  ])
]);

export const progressBarAnimation = trigger('progressBar', [
  transition(':enter', [
    style({ width: '0%' }),
    animate('1s ease-out', style({ width: '{{width}}%' }))
  ])
]);