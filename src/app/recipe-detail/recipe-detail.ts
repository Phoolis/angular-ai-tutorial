import { Component, signal, computed, inject } from '@angular/core';
import { RecipeModel } from '../models';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(Recipe);
  protected readonly recipe = signal<RecipeModel>(null!);
  protected readonly servings = signal<number>(1);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const recipes = this.recipeService.recipes();
      const recipe = recipes.find(recipe => recipe.id === id);
      this.recipe.set(recipe!);
    })
  }

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
