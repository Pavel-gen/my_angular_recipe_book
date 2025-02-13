import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() viewChange = new EventEmitter<string>();
  constructor(
    private sidebarService: SidebarService,
    public authService: AuthService
  ) {}
  view: string = 'all';
  setView(view: string): void {
    this.view = view;
    this.sidebarService.setView(view);
  }
}
