import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {}
  private currentViewSubject = new BehaviorSubject<string>('all');
  currentView$ = this.currentViewSubject.asObservable();

  setView(view: string): void {
    this.currentViewSubject.next(view);
  }
}
