import { Component, input, signal, computed } from '@angular/core';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {
  readonly recipe = input<RecipeModel>(null!);
  protected readonly servings = signal<number>(1);

  protected readonly adjustedIngredients = computed(() => 
    this.recipe().ingredients.map(ingredient => ({
      ...ingredient,
      quantity: ingredient.quantity * this.servings(),
    }))
  );
  
  protected increaseServings(): void {
    this.servings.update(current => current + 1);
  }

  protected decreaseServings(): void {
    this.servings.update(current => Math.max(1, current - 1));
  }

}
