export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  enableAnalytics: false,
  enableSentry: false,
  recaptchaSiteKey: 'your-recaptcha-site-key-here',
  firebaseConfig: {
    // Add your Firebase config here for development
    apiKey: 'your-api-key',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: '123456789',
    appId: 'your-app-id'
  }
};