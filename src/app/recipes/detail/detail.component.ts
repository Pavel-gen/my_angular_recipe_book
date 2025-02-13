import { Component } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detail',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class RecipeDetailComponent {
  recipe: Recipe | undefined;
  isOwner = false;
  currentUser: any;
  mainUser: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')?.toString();
    if (id) {
      this.recipe = this.recipeService.getRecipe(id);
    }

    if (!this.recipe) {
      return;
    }
    this.currentUser = this.authService.getCurrentUser();
    if (this.recipe.userId) {
      this.mainUser = this.authService.getUserById(this.recipe.userId);
    }
    if (this.currentUser && this.mainUser) {
      this.isOwner = this.currentUser.id == this.mainUser.id;
    }
  }
  onImageError(event: Event): void {
    this.recipeService.setDefaultImage(event);
  }
}
