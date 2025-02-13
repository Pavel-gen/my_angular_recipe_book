import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-image-upload',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  mode: 'file' | 'url' = 'url';
  imageUrl: string = '';
  selectedFile: File | null = null;
  previewImageUrl: string | null = null;

  constructor(private recipeService: RecipeService) {}

  @Input() set initialImage(value: string) {
    if (value) {
      this.imageUrl = value;
      this.previewImageUrl = value;
      this.mode = 'url';
    }
  }

  onURLChange() {
    if (this.imageUrl) {
      this.previewImageUrl = this.imageUrl;
    } else {
      this.previewImageUrl = null;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getFinalImage(): string | null {
    if (this.mode == 'url') {
      return this.imageUrl;
    } else if (this.selectedFile) {
      return this.previewImageUrl || null;
    }
    return null;
  }
  onImageError(event: Event): void {
    this.recipeService.setDefaultImage(event);
  }
}
