import { Injectable } from '@angular/core';
import { User } from '../recipe.model';
import { USERS } from '../mock-recipes';
import { Recipe } from '../recipe.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = USERS;

  constructor() {}
  get currentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  private currentUserSource = new BehaviorSubject<any>(this.getCurrentUser());
  currentUser$ = this.currentUserSource.asObservable();

  register(email: string, password: string): boolean {
    const userExists = this.users.some((u) => u.email == email);
    if (userExists) {
      console.error('Пользователь уже существует');
      return false;
    }
    this.users.push({
      id: (this.users.length + 1).toString(),
      email,
      password,
    });
    this.login(email, password);
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (user) => user.email == email && user.password == password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSource.next(user);
      return true;
    }
    console.error('Неверный email или пароль');
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSource.next(null);
  }
  getUserById(id: string): any {
    const user = this.users.find((user) => user.id == id);
    return user;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser.id;
  }

  getCurrentUserId(): number | null {
    return this.currentUser.id || null;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}
