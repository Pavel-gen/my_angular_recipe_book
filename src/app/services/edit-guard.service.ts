// edit-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class EditGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const currentUserId = this.authService.getCurrentUser()?.uid;
    const recipeId = route.params['id'];
    const recipe = await this.recipeService.getRecipe(recipeId); // метод должен быть реализован в auth.service

    if (!currentUserId || !recipe || recipe.userId !== currentUserId) {
      this.router.navigate(['/recipes']);
      return false;
    }
    return true;
  }
}
