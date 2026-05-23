import { Injectable, signal } from '@angular/core';
import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  private readonly _recipes = signal<RecipeModel[]>(MOCK_RECIPES);

  // Public read access
  readonly recipes = this._recipes.asReadonly();

  // Write method
  addRecipe(recipe: Omit<RecipeModel, 'id'>): void {
    const nextId = this._recipes().length + 1;
    this._recipes.update(current => [...current, {...recipe, id: nextId}]);
  }

}
