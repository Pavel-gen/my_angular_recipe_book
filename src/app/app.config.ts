import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import * as dotenv from 'dotenv';
dotenv.config();
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    provideFirebaseApp(() => {
      const firebaseConfig = {
        apiKey: process.env['FIREBASE_API_KEY'],
        authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
        projectId: process.env['FIREBASE_PROJECT_ID'],
        storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
        messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'],
        appId: process.env['FIREBASE_APP_ID'],
      };
      console.log('Initializing Firebase with options:', firebaseConfig);
      return initializeApp(firebaseConfig);
    }),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
  ],
};
