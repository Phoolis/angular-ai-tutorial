import { Component, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeDetail } from '../recipe-detail/recipe-detail';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
  protected readonly recipes = MOCK_RECIPES;
  protected readonly recipe = signal<RecipeModel>(this.recipes[0]);

  protected nextRecipe(): void {
    this.recipe.set(this.recipes[1]);
  }

  protected previousRecipe(): void {
    this.recipe.set(this.recipes[0]);
  }

}
