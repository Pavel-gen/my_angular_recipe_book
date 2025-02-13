import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideFirebaseApp(() => {
      const firebaseConfig = {
        apiKey: 'AIzaSyDPkwgw4poEslAW2CzX5oSjjGAAfyZ3laU',
        authDomain: 'myrecipeapp-980ac.firebaseapp.com',
        projectId: 'myrecipeapp-980ac',
        storageBucket: 'myrecipeapp-980ac.firebasestorage.app',
        messagingSenderId: '788416475284',
        appId: '1:788416475284:web:5fa4b3ce396fd657ae8481',
      };
      console.log('Initializing Firebase with options:', firebaseConfig);
      return initializeApp(firebaseConfig);
    }),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
  ],
};
