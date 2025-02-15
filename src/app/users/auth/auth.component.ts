import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-modal',
  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButton,
    FormsModule,
  ],

  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  email = '';
  password = '';
  isLogin: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'login' | 'register' },
    private dialogRef: MatDialogRef<AuthComponent>,
    private authService: AuthService
  ) {
    this.isLogin = data.mode === 'login';
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
  }

  async onSubmit(): Promise<void> {
    if (this.isLogin) {
      await this.authService.login(this.email, this.password);
    } else {
      await this.authService.register(this.email, this.password);
    }
    this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close(); // Закрываем модальное окно
  }
}
