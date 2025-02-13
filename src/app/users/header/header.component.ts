import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isModalOpen = false;
  modalMode: 'login' | 'register' = 'login';
  constructor(public authService: AuthService, private dialog: MatDialog) {}

  openAuthModal(mode: 'login' | 'register'): void {
    this.dialog.open(AuthComponent, {
      width: '400px', // Ширина окна
      data: { mode }, // Передаем режим (вход или регистрация)
      panelClass: 'custom-dialog-container', // Кастомный класс для стилизации
    });
    console.log(`Opening ${mode} modal`);
  }

  logout(): void {
    this.authService.logout();
  }
  closeModal(): void {
    this.isModalOpen = false; // Закрываем модальное окно
  }
}
