import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../recipe.model';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-ingredient-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatOption,
    MatSelectModule,
    FlexLayoutModule,
  ],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.css',
})
export class IngredientFormComponent {
  @Input() ingredient: Ingredient = {} as Ingredient;
  @Output() remove = new EventEmitter<void>();
}
