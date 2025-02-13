import { Component } from '@angular/core';
import { SidebarComponent } from '../users/sidebar/sidebar.component';
import { HeaderComponent } from '../users/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  currentView: string = 'all';
  onViewChange(view: string): void {
    this.currentView = view;
  }
}
