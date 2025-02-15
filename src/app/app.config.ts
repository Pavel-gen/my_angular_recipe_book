import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../enviroment/enviroment';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),

    provideFirebaseApp(() => {
      return initializeApp(environment.firebaseConfig);
    }),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    provideAnimationsAsync(),
  ],
};
