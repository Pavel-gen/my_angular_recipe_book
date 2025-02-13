import { RouterModule, Route } from '@angular/router';
import { RecipeListComponent } from './recipes/list/list.component';
import { RecipeDetailComponent } from './recipes/detail/detail.component';
import { RecipeEditComponent } from './recipes/edit/edit.component';
import { LayoutComponent } from './layout/layout.component';
import { EditGuardService } from './services/edit-guard.service';

export const APP_ROUTES: Route[] = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: LayoutComponent, // Используем LayoutComponent как обертку
    children: [
      { path: '', component: RecipeListComponent }, // Главная страница рецептов
      { path: 'new', component: RecipeEditComponent }, // Создание нового рецепта
      { path: ':id', component: RecipeDetailComponent }, // Детали рецепта
      {
        path: 'edit/:id',
        component: RecipeEditComponent,
        canActivate: [EditGuardService], // добавляем гвард
      }, // Редактирование рецепта
    ],
  },
];
