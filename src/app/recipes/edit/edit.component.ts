import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ingredient, Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientFormComponent } from '../../ingredient-form/ingredient-form.component';
import { ImageUploadComponent } from '../../image-upload/image-upload.component';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    IngredientFormComponent,
    ImageUploadComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class RecipeEditComponent {
  recipeForm: Recipe = {} as Recipe;

  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  @ViewChild('imageUploader') imageUploader!: ImageUploadComponent;

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const recipe = await this.recipeService.getRecipe(id);
      if (recipe) {
        this.recipeForm = { ...recipe };
      } else {
        this.recipeForm = {} as Recipe;
      }
    }
  }
  onSubmit(): void {
    const finalImage = this.imageUploader.getFinalImage();
    this.recipeForm.image = finalImage || '';
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      alert('Пользователь нe найден');
      this.router.navigate(['/recipes']);
      return;
    }
    this.recipeForm.userId = userId;

    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.recipeForm);
    } else {
      this.recipeService.addRecipe(this.recipeForm);
    }
    this.router.navigate(['/recipes']);
  }

  addIngredient() {
    if (!this.recipeForm.ingredients) {
      this.recipeForm.ingredients = [];
    }
    this.recipeForm.ingredients.push({ name: '' });
  }
  removeIngredient(index: number) {
    this.recipeForm.ingredients.splice(index, 1);
  }
}
