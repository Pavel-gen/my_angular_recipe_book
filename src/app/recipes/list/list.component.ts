import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../recipe.model';
import { CommonModule } from '@angular/common';
import {
  EnabledBlockingInitialNavigationFeature,
  RouterLink,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchQuery: string = '';
  sortField: string = '';
  currentPage = 1;
  totalPages: number = 0;
  currentView: string = 'all';
  currentUser!: any;
  currentUserId!: string | null;
  isLoggedIn: boolean = false;
  private subscription!: Subscription;

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog,
    private authService: AuthService,
    private sidebarService: SidebarService
  ) {}

  async ngOnInit() {
    await this.updateTotalPages();
    if (this.recipes.length == 0) {
      this.loadRecipes();
    }
    this.subscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.currentUserId = user?.uid || null;
      this.isLoggedIn = !!user?.uid;
    });

    this.sidebarService.currentView$.subscribe(async (view) => {
      if (this.currentView != view) {
        this.currentPage = 1;
        this.currentView = view;
        this.recipes = [];
        await this.updateTotalPages();

        this.loadRecipes();
      }
    });
  }

  async updateTotalPages() {
    try {
      if (this.currentView === 'all') {
        this.totalPages = await this.recipeService.getTotalPages('all');
      } else if (this.currentView === 'my') {
        const currentUser = this.authService.getCurrentUser();
        this.totalPages = await this.recipeService.getTotalPages(
          'my',
          currentUser.uid
        );
      }
    } catch (error) {
      console.error('Failed to update total pages:', error);
      this.totalPages = 0;
    }
  }

  loadMore(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadRecipes();
    } else {
      console.log('Все рецепты загружены ');
    }
  }

  async loadRecipes() {
    let newRecipes: Recipe[] = [];
    if (this.currentView == 'all') {
      newRecipes = await this.recipeService.getRecipes(this.currentPage);
    } else if (this.currentView == 'my') {
      const currentUser = this.authService.getCurrentUser();
      console.log(currentUser);
      newRecipes = await this.recipeService.getRecipesByUserId(
        currentUser.uid,
        this.currentPage
      );
    }

    if (this.currentPage === 1) {
      this.recipes = [];
    }

    const uniqueRecipeIds = new Set(this.recipes.map((recipe) => recipe.id));
    const filteredNewRecipes = newRecipes.filter(
      (recipe) => !uniqueRecipeIds.has(recipe.id)
    );

    this.recipes = [...this.recipes, ...filteredNewRecipes];
    this.filteredRecipes = this.recipes;

    if (this.sortField != '') {
      this.onSort();
    }
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredRecipes = this.recipes;
      return;
    }
    this.filteredRecipes = this.recipes.filter((r) =>
      r.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  clearSearch(): void {
    this.searchQuery = '';
    this.filteredRecipes = this.recipes;
  }

  deleteRecipe(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recipeService.deleteRecipe(id);
        this.filteredRecipes = this.recipes.filter((r) => r.id != id);
      }
    });
  }

  onSort() {
    this.filteredRecipes = [...this.filteredRecipes].sort((a, b) => {
      if (this.sortField === 'title') {
        return a.title.localeCompare(b.title);
      } else if (this.sortField === 'createdAt') {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      } else if (this.sortField == 'prepTime') {
        return a.preparationTime - b.preparationTime;
      }
      return 0;
    });
  }

  onImageError(event: Event): void {
    this.recipeService.setDefaultImage(event);
  }
}
