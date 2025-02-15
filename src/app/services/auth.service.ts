import { Injectable } from '@angular/core';
import { User } from '../recipe.model';
import { USERS } from '../mock-recipes';
import { Recipe } from '../recipe.model';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  AuthErrorCodes,
} from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = USERS;

  private auth = getAuth();
  private currentUserSource = new BehaviorSubject<any>(this.getCurrentUser());
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSource.next(user);
    });
  }

  get currentUser(): any {
    if (this.currentUserSource) return this.currentUserSource.getValue();
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(this.firestore, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
      });
      this.login(email, password);
    } catch (error: any) {
      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        throw new Error('Пользователь с таким email уже существует');
      }
      throw error; // Передача других ошибок
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      if (
        error.code === AuthErrorCodes.INVALID_PASSWORD ||
        error.code === AuthErrorCodes.USER_DELETED
      ) {
        alert('Неверный email или пароль');
        throw new Error('Неверный email или пароль');
      }
      throw error; // Передача других ошибок
    }
  }

  async logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.currentUserSource.next(null);
    });
  }
  async getUserById(uid: string): Promise<any> {
    try {
      const userDocRef = doc(this.firestore, 'users', uid); // Ссылка на документ пользователя
      const userSnapshot = await getDoc(userDocRef); // Получение данных

      if (userSnapshot.exists()) {
        return { uid, ...userSnapshot.data() }; // Возвращаем данные пользователя
      } else {
        alert('Пользователь не найден');
        throw new Error('Пользователь не найден');
      }
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  getCurrentUserId(): string | null {
    return this.currentUser.uid || null;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
